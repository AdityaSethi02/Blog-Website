
import z from "zod";

// Signup
export const signupInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().optional(),
});
export type SignupInput = z.infer<typeof signupInput>;


// Signin
export const signinInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});
export type SigninInput = z.infer<typeof signinInput>;


// Create Blog
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
});
export type CreateBlogInput = z.infer<typeof createBlogInput>;


// Update Blog
export const updateBlogInput = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
});
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;

