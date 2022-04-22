/* eslint-disable */
import { User, users } from "../models/users";
import express from "express";
import { authenticateUser, passwordHashing, verifyToken, verifyUser } from "../service/authentication";

const _user_ = new users();
const authentication_routes = express.Router();

async function authentication(req: express.Request, res: express.Response) {
    try {
        await authenticateUser(req, res, () => {
            authenticationSuccess(req.body.username);
        });

    } catch (error) {
        throw new Error(`Authentication error`)
    }
}
function authenticationSuccess(user: string): void {
    console.log(`${user}: Authenticated`);
}




// authentication_routes.get('/index', authenticateUser, verifyToken, index);
authentication_routes.post('/authenticate', authentication);
export default authentication_routes