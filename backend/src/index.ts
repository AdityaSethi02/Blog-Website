import { Hono } from 'hono';
import { userRouter } from './routes/userRoutes';
import { blogRouter } from './routes/blogRoutes';
import { cors } from "hono/cors";

const app = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
    }
}>();

app.use('/*', cors({
  origin: 'https://wordweaver-blog.vercel.app',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowHeaders: ['Authorization, Content-Type'],
}))
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
