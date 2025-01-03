import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { TBlog } from './blog.interface';
import { BlogModel } from './blog.model';
import { JwtPayload } from 'jsonwebtoken';

const createBlogIntoDB = async (user: JwtPayload, payload: TBlog) => {
  const result = await BlogModel.create(payload);
  // console.log(result);
  if (!result) {
    throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, 'Blog not created');
  }

  const processedResult = await BlogModel.findById(result._id)
    .populate('author')
    .select('-createdAt -updatedAt -isPublished -__v')
    .lean();
  return processedResult;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const result = new QueryBuilder(BlogModel.find().populate('author'), query)
    .search(['title', 'content'])
    .filter()
    .sort()
    .modelQuery.lean();

  if (Array.isArray(result) && result.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'No blogs found');
  }
  return result;
};

const updateBlogInDB = async (id: string, payload: TBlog) => {
  const result = await BlogModel.findByIdAndUpdate(id, payload, {
    runValidators: true,
    new: true,
  })
    .populate('author')
    .select('-createdAt -updatedAt -isPublished -__v');
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found and updated');
  }
  return result;
};

const deleteBlogFromDB = async (id: string) => {
  const result = await BlogModel.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Blog not found and deleted');
  }
  return result;
};

export const BlogService = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  updateBlogInDB,
  deleteBlogFromDB,
};
