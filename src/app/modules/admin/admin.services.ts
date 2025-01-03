import { StatusCodes } from "http-status-codes";
import { UserModel } from "../auth/user.model"
import { BlogModel } from "../blog/blog.model"
import AppError from "../../errors/AppError";

const blockUserInDB = async (userId: string) => {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { isBlocked: true },
      { new: true, runValidators: true }
    );

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
    }

    return user;
}
const deleteBlogFromDB = async (blogId: string) => {
    const deletedBlog  = await BlogModel.findByIdAndDelete(blogId)
    return deletedBlog
}

export const AdminService = {
    blockUserInDB,
    deleteBlogFromDB
}