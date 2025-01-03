import { z } from "zod";

const createBlogValidationSchema = z.object({
    title: z.string().nonempty(),
    content: z.string().nonempty(),
    author: z.string().nonempty(),
});
const updateBlogValidationSchema = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    author: z.string().optional(),
}).strict();

export const BlogValidationSchema = {
    createBlogValidationSchema,
    updateBlogValidationSchema
}