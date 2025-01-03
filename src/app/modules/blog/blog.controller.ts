import { catchAsync } from '../../utils/catchAsync';
import { BlogService } from './blog.service';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';

const createBlog = catchAsync(async (req, res) =>{
  console.log(req.user)
  const result = await BlogService.createBlogIntoDB(req.user, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Blog created successfully',
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) =>{

  const result = await BlogService.getAllBlogsFromDB(req.query);
  sendResponse(res,{
    statusCode: StatusCodes.OK,
    success:true,
    message: 'All blogs fetched successfully',
    data: result
  })
})

const updateBlog = catchAsync(async (req, res) =>{
  const result = await BlogService.updateBlogInDB(req.params.id, req.body);
  sendResponse(res,{
    statusCode: StatusCodes.OK,
    success:true,
    message: 'Blog updated successfully',
    data: result
  })
});

const deleteBlog = catchAsync(async (req, res) =>{
  const result = await BlogService.deleteBlogFromDB(req.params.id);
  if(!result){
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found and deleted');
  }
  sendResponse(res,{
    statusCode: StatusCodes.OK,
    success:true,
    message: 'Blog deleted successfully',
    data: ""
  })
})

export const BlogController = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog
};
