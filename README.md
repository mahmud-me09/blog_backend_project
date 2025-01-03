# Blog Backend Project

### The live link is: https://blog-backend-project-eight.vercel.app

### Features:
## Features

1. **User Roles**  
   - **Admin**: Can delete any blog, block users, but cannot update blogs. Created manually with predefined credentials.  
   - **User**: Can register, log in, create, update, and delete their own blogs. Cannot perform admin actions.

2. **Authentication & Authorization**  
   - Users must log in to perform write, update, or delete operations.  
   - Admin and User roles are differentiated and secured.

3. **Blog API**  
   - Public API for reading blogs, supporting search, sorting, and filtering.  
   - Blog details include title, content, and author information.

4. **Models**  
   - **User Model**: Includes name, email, password, role (admin/user), and status (blocked or not).  
   - **Blog Model**: Includes title, content, author reference, published status, and timestamps.

5. **Admin Actions**  
   - Admin can block users and delete any blog. Both actions require authorization.

### Technology Used:
1. nodeJS
2. ExpressJS
3. Typescript
4. MongoDB and mongoose

### For api Endpoints:


| Function         | Method | Route                          | Authorized Entity |
|------------------|--------|--------------------------------|-------------------|
| Register User    | POST   | /api/auth/register             | User              |
| Login User       | POST   | /api/auth/login                | User, Admin       |
| Create Blog      | POST   | /api/blogs                     | User              |
| Update Blog      | PATCH  | /api/blogs/:id                 | User              |
| Delete Blog      | DELETE | /api/blogs/:id                 | User              |
| Get All Blogs    | GET    | /api/blogs                     | Public            |
| Block User       | PATCH  | /api/admin/users/:userId/block | Admin             |
| Delete Blog      | DELETE | /api/admin/blogs/:id           | Admin             |



### How to setup the project locally:

1. Clone the repository.
2. create a environment variable file with the following keys:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=mongodb connection string
BCRYPT_SALT_ROUNDS=put a number between 5-15
DEFAULT_PASSWORD=choose a default password
JWT_SECRET=provide a secure jwt secret
```

3. run the following commands:
```bash
npm i
npm run build
npm run dev
```
4. For eslint access:
```bash
npm run lint
npm run lint:fix
```
5. for beautify:
```bash
npm run format
```