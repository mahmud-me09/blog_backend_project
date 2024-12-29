import { Router } from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidationSchema } from "./user.validator";

const router = Router()

router.get('/user',validateRequest(UserValidationSchema.CreateUserValidationSchema), UserController.getUser)

export const UserRoutes = router