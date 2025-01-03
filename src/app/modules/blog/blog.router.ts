import { Router } from "express";
import { BlogController } from "./blog.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BlogValidationSchema } from "./blog.validator";
import { tokenVarification } from "../../middlewares/tokenVarification";

const router = Router()

router.post('/blogs', tokenVarification,  BlogController.createBlog);
router.get('/blogs', BlogController.getAllBlogs);
router.patch('/blogs/:id', validateRequest(BlogValidationSchema.updateBlogValidationSchema), BlogController.updateBlog);
router.delete('/blogs/:id',  BlogController.deleteBlog);

export const BlogRoutes = router;