import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { User } from '../models/users';
import client from '../../database';
import { getCertainDataFromUser } from '../../helpers/helper_functions';

const pepper: string = process.env.BCRYPT_PASSWORD as string;
const saltRounds: number = parseInt(process.env.SALT_ROUNDS as string);
const secret: string = process.env.TOKEN_SECRET as string;

// creates password digest from user input password and returns created digest as string //DEBUGGED and WORKING
export function passwordHashing(password: string): string {
    try {
        const password_digest: string = bcrypt.hashSync(
            password + pepper,
            saltRounds
        );
        return password_digest;
    } catch (err) {
        throw new Error(`${err}`);
    }
}

// compares user input password with password in DB and returns boolean DEBUGGED AND WORKING
export async function authenticate(
    username: string,
    password: string
): Promise<boolean | null> {
    try {
        const conn = await client.connect();
        const sql = `SELECT password from users WHERE username ='${username}';`;
        const result = await conn.query(sql);
        if (result.rowCount) {
            const pass_digest = result.rows[0].password;
            conn.release();
            const authenticated: boolean = await bcrypt.compare(
                password + pepper,
                pass_digest
            );
            return authenticated;
        } else {
            return null;
        }
    } catch (error) {
        return false;
    }
}

//MIDDLE WARE that check if user is authenticated, supply JWT to response header and returns boolean // DEBUGGED AND WORKING
export const authenticateUser = async (
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/ban-types
    next: Function
): Promise<void> => {
    const user_name: string = req.body.username as string;
    const password: string = req.body.password as string;
    const authenticated = await authenticate(user_name, password);
    // const authenticated = true
    if (authenticated === true) {
        const JWT = await createToken(user_name, res);
        const BEARER_JWT = 'BEARER ' + JWT
        res.json(BEARER_JWT);
        res.status(200);
        await user_loggedIn(user_name);
        next();
    } else if (authenticated === false) {
        res.status(401);
        res.json(`Wrong password, Access denied`);
        return;
    } else if (authenticated === null) {
        res.status(401);
        res.json(
            `Username: ${user_name} is not found in database, Check username, \n If not registered please create new user`
        );
        return;
    }
};

export async function createToken(
    username: string,
    res: Response
): Promise<string> {
    try {
        const conn = await client.connect();
        const sql = `SELECT id,username,fullname,degree,role from users WHERE username='${username}';`;
        const result = await conn.query(sql);
        const usOb: User = result.rows[0];
        const token: string = jwt.sign(usOb, secret);
        return token;
    } catch (error) {
        res.status(400);
        const err = `Error in authentication module level: Failed to authenticate ${username}: ${error}`;
        return err;
    }
}

/*this will be a middleware for verification of the requests, should add to routes //DEBUGGED AND WORKING
 this middle ware accepts at least 1 parameter for the role and should be added in routes*/
export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    /*Uncomment the below code only for testing purposes.
      the idea is that I added a function to supply JWT to response.headers.authorization, so I can verify the token*/
    // let authHeader: string = res.getHeader("authorization") as string;
    // if (req.headers.authorization) {
    //     authHeader = req.headers.authorization as string;
    // }

    try {
        const authHeader = req.headers.authorization as string;
        let token: string;
        if (authHeader) {
            token = authHeader.split(' ')[1];
            const user_data: User = jwt.verify(token, secret) as User;
            if (user_data) {
                next();
            } else {
                res.send('Token verification error');
            }
        } else {
            res.send(`Error: Token is not provided with your request`);
        }
    } catch (error) {
        res.send(`Eroor: ${error}`);
    }
};

/* confirms the permission of the user before any changes in database
optional parameter user_id_to_update is used when updating user
optional parameters role1, role2, role3 are used to specify permissions in handlers*/
export async function verifyUser(
    RequestingUserName: string,
    user_id_to_update?: string,
    role1?: string,
    role2?: string,
    role3?: string
): Promise<boolean | null> {
    try {
        let userName: string;
        // if updating, function will need the id of the user to update
        if (user_id_to_update) {
            userName = await getCertainDataFromUser(
                'id',
                user_id_to_update,
                'user_name'
            );
            const role = await getCertainDataFromUser(
                'user_name',
                RequestingUserName,
                'role'
            );
            if (role === role1) {
                return true;
            }
            if (role === role2 || role === role) {
                if (RequestingUserName === userName) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            // If not updating user, id is not required, function will proceed
            const role = await getCertainDataFromUser(
                'username',
                RequestingUserName,
                'role'
            );
            // if no permissions are identified in handler, function will proceed
            if (!role1) {
                return true;
            }
            if (role === role1 || role === role2 || role === role3) {
                return true;
            } else {
                return false;
            }
        }
    } catch (error) {
        return null;
    }
}


export const getDataFromToken = async (
    req: Request,
    res: Response,
): Promise<User> => {
    try {
        const authHeader = req.headers.authorization as string;
        const token = authHeader.split(' ')[1];
        const user_data: User = jwt.verify(token, secret) as User;
        return user_data;

    } catch (error) {
        res.send(`Eroor: ${error}`);
        throw new Error(`${error}`);
    }
};


// Registers each user login with its TIMESTAMP to track logins
export async function user_loggedIn(
    username: string,
): Promise<void> {
    try {
        const conn = await client.connect();
        const sql = `INSERT INTO users_login (username, login_time) VALUES ('${username}' , NOW());`;
        await conn.query(sql);
    } catch (error) {
        throw new Error(`${error}`);
    }
}