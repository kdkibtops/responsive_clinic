import client from "../../database";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { checkUserIDPresentInDB, checkUserNameInDB, getCertainDataFromUser } from "../../helpers/helper_functions";

export type User = {
    id?: string,
    fullname: string,
    username: string,
    password: string,
    degree?: string,
    role?: string,
    email?: string
}

export class users {
    async createNewUser(user: User): Promise<string> {
        const username_used = await checkUserNameInDB(user.username);
        if (username_used) {
            return `Username: ${user.username} is already used before, choose another username please`
        }
        else if (!username_used) {
            try {
                const conn = await client.connect();
                const SQL = `INSERT INTO users 
                (fullname, username, password,degree, role, email)
                VALUES ( '${user.fullname}', '${user.username}', '${user.password}', '${user.degree}', '${user.role}', '${user.email}') RETURNING *;`
                const response = await conn.query(SQL);
                const createdUser = response.rows[0];
                conn.release();
                return (`Registeration successful.\nUsername: ${createdUser.username}\nUser id: ${createdUser.id}`);
            } catch (error) {
                throw new Error(`@createNewUser Function in users model: ${error}`);
            }
        } else {
            return (`Unknown error in checking availability of username @ createNewUser`);
        }

    }

    async indexAllUsers(): Promise<User[]> {
        try {
            const conn = await client.connect();
            const SQL = `SELECT id, fullname, username, email, degree, role FROM users;`
            const result = await conn.query(SQL);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`@indexAllUsers Function in users model: ${error}`)
        }

    }

    async showUser(user_name: string): Promise<User | string> {
        const username_present = await checkUserNameInDB(user_name);
        if (!username_present) {
            return `Username: ${user_name} not found in database`
        }
        else if (username_present) {
            try {
                const conn = await client.connect();
                const SQL = `SELECT id, fullname, username, email, degree, role FROM users WHERE username = '${user_name}'`
                const result = await conn.query(SQL);
                conn.release();
                return result.rows[0];
            } catch (error) {
                throw new Error(`@ShowUser Function in users model: ${error}`);
            }
        } else {
            return (`Unknown error in checking availability of username @ showUsers`);
        }
    }

    async updateUser(username: string, param: string, updateValue: string): Promise<string> {
        const username_present = await checkUserNameInDB(username);
        if (!username_present) {
            return `Username: ${username} not found in database`
        }
        else if (username_present) {
            try {
                const conn = await client.connect();
                const SQL = `UPDATE users SET ${param}='${updateValue} WHERE username = '${username}'`
                await conn.query(SQL);
                return (`Updating ${username} successful`);
            } catch (error) {
                throw new Error(`@updateUser Function in users model: ${error}`);
            }
        } else {
            return (`Unknown error in updating user @ updateUser`);
        }
    }

    async deleteUser(username: string): Promise<string> {
        const username_present = await checkUserNameInDB(username);
        if (!username_present) {
            return `Username: ${username} not found in database`
        }
        else if (username_present) {
            try {
                const conn = await client.connect();
                const SQL = `DELETE FROM users WHERE username = '${username}'`
                await conn.query(SQL);
                conn.release();
                return (`${username} Deleted successfully`);
            } catch (error) {
                throw new Error(`@deleteUser Function in users model: ${error}`);
            }
        } else {
            return (`Unknown error in deleting user @ deleteUser`);
        }
    }

}
