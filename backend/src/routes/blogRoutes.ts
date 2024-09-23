import { createBlogInput, updateBlogInput } from "@adityasethi02/blogweb-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

blogRouter.use(async (c, next) => {
    const authHeader = c.req.header("Authorization");
    if (!authHeader) {
        c.status(401);
        return c.json({ error: "Unauthorized" });
    }

    // const token = authHeader.split(" ")[1];
    const user = await verify(authHeader, c.env.JWT_SECRET);

    if (!user) {
        c.status(401);
        return c.json({ error: "Unauthorized" });
    }

    c.set("userId", String(user.id));
    await next();
});

blogRouter.post('/create', async (c) => {
    const userId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const parsedInput = createBlogInput.safeParse(body);
    if (!parsedInput.success) {
        c.status(400);
        return c.json ({ error: "Invalid Inputs", details: parsedInput.error.errors });
    }

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId
        }
    });

    return c.json({ id: blog.id });
});

blogRouter.put("/update", async (c) => {
    const userId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const parsedInput = updateBlogInput.safeParse(body);
    if (!parsedInput.success) {
        c.status(400);
        return c.json ({ error: "Invalid Inputs", details: parsedInput.error.errors });
    }

    try {
        const existingBlog = await prisma.blog.findUnique({
            where: {
                id: body.id
            }
        });

        if (!existingBlog || existingBlog.authorId !== userId) {
            c.status(403);
            return c.json({ error: "Unauthorized or blog not found" });
        }

        const updatedBlog = await prisma.blog.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
            }
        });
        return c.json({ msg: "Blog Updated", blog: updatedBlog });
    } catch (error) {
        console.log("Error while updating the blog", error);
        c.status(500);
        return c.json({ error: "Failed to update blog" });
    }
});

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    });

    const allBlogs = await prisma.blog.findMany();

    return c.json(allBlogs);
});

blogRouter.get("/blog/:id", async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blog = await prisma.blog.findUnique({
        where: {
            id: id
        }
    });

    return c.json(blog);
});
