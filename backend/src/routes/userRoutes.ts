import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@adityasethi02/blogweb-common";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    }
}>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const parsedInput = signupInput.safeParse(body);

    if (!parsedInput.success) {
      c.status(400);
      return c.json({ error: "Incorrect Inputs" , details: parsedInput.error.errors });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email
      }
    });

    if (existingUser) {
      c.status(403);
      return c.json({ error: "Email already exists" });
    }

    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            }
        });
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt });
    } catch (error) {
      c.status(403);
      return c.json({ error: "Error while signup" });
    }
});

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const parsedInput = signinInput.safeParse(body);

    if (!parsedInput.success) {
      c.status(400);
      return c.json({ error: "Invalid Inputs" , details: parsedInput.error.errors });
    }

    try {
      const user = await prisma.user.findUnique({
        where: {
          email: body.email
        }
      });

        if (!user) {
            c.status(403);
            return c.json({ error: "User not found" });
        }

        if (user.password !== body.password) {
          c.status(403);
          return c.json({ error: "Incorrect password" });
        }

        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt, user: { name: user.name } });
    } catch (error) {
        c.status(403);
        return c.json({ error: "Error while signin" });
    }
});