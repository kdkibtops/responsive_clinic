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

export async function testDB(): Promise<void> {
    const connected = await client.connect();
    if (connected) {
        const sql = `SELECT NOW();`
        const response = await connected.query(sql);
        connected.release();
        const result = response.rows[0].now;
        console.log(`Connection to database: "${setupData.database}" is successful\nConnected at: ${result}`);
    } else {
        console.log(`Error while connecting to database: ${setupData.database}`);
    }
}


export default client;