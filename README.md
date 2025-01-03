### The live link is: https://blog-backend-project-eight.vercel.app

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

npm i
npm run build
npm run dev

4. For eslint access:

npm run lint
npm run lint:fix

5. for beautify:

npm run format