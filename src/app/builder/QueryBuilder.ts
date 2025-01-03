import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.search as string | undefined;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query };


    const excludeFields = ['search', 'sortBy', 'sortOrder'];

    excludeFields.forEach((field) => delete queryObj[field]);

    const queryObjModified = {author: queryObj.filter};

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort() {
    const sortBy = (this.query?.sortBy as string) || 'createdAt';
    const sortOrder = this.query?.sortOrder === 'asc' ? 1 : -1; // Default to descending if not provided

    this.modelQuery = this.modelQuery.sort({ [sortBy]: sortOrder });
    return this;
  }
}

export default QueryBuilder;
