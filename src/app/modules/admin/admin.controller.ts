import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { AdminService } from './admin.services';

const blockUser = catchAsync(async (req, res) => {
  const result = await AdminService.blockUserInDB(req.params.userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User blocked successfully',
    data: result ? result : undefined,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const result = await AdminService.deleteBlogFromDB(req.params.blogId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: result ? result : undefined,
  });
});

export const AdminController = {
  blockUser,
  deleteBlog
};
