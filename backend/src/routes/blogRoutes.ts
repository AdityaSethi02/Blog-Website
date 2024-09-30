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
        userId: number;
    }
}>();

blogRouter.use("/*", async (c, next) => {
    const authHeader = (c.req.header("Authorization") || "").split(" ")[1];

    if (!authHeader) {
        c.status(403);
        return c.json({ error: "Unauthorized" });
    }

    try {
        const user = await verify(authHeader, c.env.JWT_SECRET);
        if (user) {
            c.set("userId", Number(user.id));
            await next();
        } else {
            c.status(403);
            return c.json({ msg: "Forbidden" });
        }
    } catch (error) {
        c.status(403);
        return c.json({ error: "Unauthorized", errorDetails: error });
    }
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

    try {
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId,
                published: true,
                publishedAt: new Date()
            }
        });

    return c.json({ id: blog.id });
    } catch (error) {
        return c.json({ error: "Error while publishing the blog" });
    }
});

blogRouter.put("/update/:id", async (c) => {
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
                id: Number(body.id)
            }
        });

        if (!existingBlog || existingBlog.authorId !== userId) {
            c.status(403);
            return c.json({ error: "Unauthorized or blog not found" });
        }

        const updatedBlog = await prisma.blog.update({
            where: {
                id: Number(body.id)
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

    const allBlogs = await prisma.blog.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });

    return c.json(allBlogs);
});

blogRouter.get("/blog/:id", async (c) => {
    const id = c.req.param("id");
    console.log(id);
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                authorId: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return c.json({ blog: blog });
    } catch (error) {
        c.status(411);
        return c.json({ msg: "Error while fetching the blog" });
    }
});

blogRouter.get("/my-blogs", async (c) => {
    const userId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try{
        const userBlogs = await prisma.blog.findMany({
            where: {
                authorId: userId
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                },
                publishedAt: true
            }
        });
        return c.json({ blogs: userBlogs });
    } catch (error) {
        console.error("Error while fetching user blogs:", error);
        c.status(411);
        return c.json({ msg: "Error while fetching the blogs" });
    }
});

blogRouter.delete("/delete/:id", async (c) => {
    const userId = c.get("userId");
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.blog.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!blog || blog.authorId !== userId) {
            c.status(403);
            console.log(id); // returns 2
            console.log(blog); // returns the blog with id=2, authorId=1
            console.log((blog == null) ? "blog null" : blog.authorId); // returns 1
            console.log(userId); // returns 16
            return c.json({ error: "Blog not found" });
        }

        await prisma.blog.delete({
            where: {
                id: Number(id)
            }
        });

        return c.json({ msg: "Blog deleted successfully" });
    } catch (error) {
        console.error("Error deleting blog", error);
        c.status(500);
        return c.json({ error: "Failed to delete blog" });
    }
});
