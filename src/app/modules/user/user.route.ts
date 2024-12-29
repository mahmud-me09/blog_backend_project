import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router()

router.get('/user', UserController.getUser)

export const UserRoutes = router