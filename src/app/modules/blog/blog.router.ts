import { Router } from 'express';
import { BlogController } from './blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidationSchema } from './blog.validator';
import { verifyUser } from '../../middlewares/verifyUser';

const router = Router();

router.post('/blogs', verifyUser(), BlogController.createBlog);
router.get('/blogs', BlogController.getAllBlogs);
router.patch(
  '/blogs/:id', verifyUser(),
  validateRequest(BlogValidationSchema.updateBlogValidationSchema),
  BlogController.updateBlog
);
router.delete('/blogs/:id',verifyUser(), BlogController.deleteBlog);

export const BlogRoutes = router;
