import dotenv from 'dotenv';
dotenv.config();

export const setupData = {
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    database_test: process.env.POSTGRES_DB_TEST,
    DB_username: process.env.POSTGRES_USER,
    DB_password: process.env.POSTGRES_PASSWORD,
    DB_port: Number(process.env.DB_PORT),
    server_port: Number(process.env.SERVER_PORT),
    hashPassword: process.env.BCRYPT_PASSWORD,
    JWT_secret: process.env.TOKEN_SECRET
}