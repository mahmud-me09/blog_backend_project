import { Router } from "express";
import { AdminController } from "./admin.controller";
import { verifyAdmin } from "../../middlewares/verifyAdmin";

const router = Router();

router.patch('/users/:userId/block', verifyAdmin(), AdminController.blockUser);

router.delete('/blogs/:blogId', verifyAdmin(), AdminController.deleteBlog);

export const AdminRoutes = router;