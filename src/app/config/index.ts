import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URL,
  nodeEnvironment: process.env.NODE_ENV,
  bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
  defaultPassword: process.env.DEFAULT_PASSWORD,
  jwtSecret: process.env.JWT_SECRET,
};
