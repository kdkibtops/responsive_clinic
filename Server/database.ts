import { Pool } from "pg";
import dotenv from 'dotenv';
import { setupData } from './config/config'

dotenv.config();


const client = new Pool({
    host: setupData.host,
    database: setupData.database,
    user: setupData.DB_username,
    password: setupData.DB_password,
    port: setupData.DB_port

});

export default client;