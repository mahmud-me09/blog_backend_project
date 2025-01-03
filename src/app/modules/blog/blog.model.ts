import { model, Schema } from 'mongoose';
import { TBlog } from './blog.interface';

const blogSchema = new Schema<TBlog>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    isPublished: {
      type: Boolean,
      default: false,
      select:0
    },
  },
  { timestamps: true }
);

export const BlogModel = model<TBlog>('Blog', blogSchema);