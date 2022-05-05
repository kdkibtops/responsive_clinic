import { User, users } from "../models/users";
import express from "express";
import { authenticateUser, getDataFromToken, passwordHashing, verifyToken, verifyUser } from "../service/main_authentication";
import * as clinicTypes from '../../config/clinicTypes';


const _user_ = new users();
const users_routes = express.Router();

// checks users credentials against database, if correct it will supply JWT to response
// JWT can be stored in localstorage or cookie for further sign in
async function authentication(req: express.Request, res: express.Response) {
    try {
        const JWT = await authenticateUser(req.body as clinicTypes.REQBODY, res);
        res.status(200);
        res.json(JWT);
    } catch (error) {
        throw new Error(`Authentication error`)
    }
}
async function indexNotVerify(req: express.Request, res: express.Response): Promise<void> {
    try {
        const users__ = await _user_.indexAllUsers();
        res.status(200);
        res.json(users__);

    } catch (error) {
        throw new Error(`!Error at handler level!, Can't retrieve data: ${error}`);
    }
}
async function index(req: express.Request, res: express.Response): Promise<void> {
    try {
        const reqBody = req.body as clinicTypes.REQBODY
        const user_data = await getDataFromToken(req);
        const verification = await verifyUser(user_data.username, '', 'admin');
        console.log(`Verification: ${verification}`);
        if (verification === null) {
            res.status(404);
            res.json(`Verification failed, Username ${reqBody.data.user.username} is not found in database`);
        } else if (verification === true) {
            const users__ = await _user_.indexAllUsers();
            res.status(200);
            res.json(users__);
        } else if (verification === false) {
            res.status(401);
            res.json(`User verification failed`);
        }
    } catch (error) {
        throw new Error(`!Error at handler level!, Can't retrieve data: ${error}`);
    }
}
async function showUser(req: express.Request, res: express.Response): Promise<void> {
    try {

        const verification = await verifyUser(req.params.username);
        if (verification === null) {
            res.status(404);
            res.json(`Verification failed, Username ${req.params.username} is not found in database`);
        } else if (verification === true) {
            const users__ = await _user_.showUser(req.params.username);
            res.json(users__);
        } else if (verification === false) {
            res.json(`User verification failed`);
        }
    } catch (error) {
        throw new Error(`!Error at handler level!, Can't retrieve data: ${error}`);
    }
}
async function createUser(req: express.Request, res: express.Response): Promise<void> {
    try {
        const reqBody = req.body as clinicTypes.REQBODY
        const password_digest = passwordHashing(reqBody.data.body.users?.password as string);
        const newUser: User = {
            fullname: reqBody.data.body.users?.fullname as string,
            username: reqBody.data.body.users?.password as string,
            password: password_digest,
            role: reqBody.data.body.users?.role as string,
            degree: reqBody.data.body.users?.degree as string,
            email: reqBody.data.body.users?.email as string
        }
        const users__ = await _user_.createNewUser(newUser);
        res.json(users__);
    } catch (error) {
        throw new Error(`!Error at handler level!, Can't create user: ${error}`);
    }
}
async function deleteUser(req: express.Request, res: express.Response): Promise<void> {
    try {
        const reqBody = req.body as clinicTypes.REQBODY;
        const verification = await verifyUser(reqBody.data.user.req_username);
        if (verification === null) {
            res.json(`Verification failed, Username ${reqBody.data.user.req_username} is not found in database`);
        } else if (verification === true) {
            const users__ = await _user_.deleteUser(reqBody.data.body.users?.username || 'nothingToDelete');
            res.json(users__);
        } else if (verification === false) {
            res.json(`User verification failed`);
        }
    } catch (error) {
        throw new Error(`!Error at handler level!, Can't retrieve data: ${error}`);
    }
}
async function updateUser(req: express.Request, res: express.Response): Promise<void> {
    try {
        const reqBody = req.body as clinicTypes.REQBODY;
        const verification = await verifyUser(reqBody.data.user.req_username);
        if (verification === null) {
            res.json(`Verification failed, Username ${reqBody.data.user.req_username} is not found in database`);
        } else if (verification === true) {
            const usernameToUpdate = reqBody.data.body.updating_user?.username || 'nothing';
            const updateField = reqBody.data.body.updating_user?.updateField || 'nothing';
            const updateValue = reqBody.data.body.updating_user?.updateValue || 'nothing';
            if (usernameToUpdate === 'nothing' || updateField === 'nothing' || updateValue === 'nothing') {
                res.status(400);
                res.json('No update data provided, please check your request');
            } else {
                const users__ = await _user_.updateUser(usernameToUpdate, updateField, updateValue);
                res.json(users__);
            }
        } else if (verification === false) {
            res.json(`User verification failed`);
        }
    } catch (error) {
        throw new Error(`!Error at handler level!, Can't update data: ${error}`);
    }
}
const welcome = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        res.json('Welcome to the users section');
    } catch (error) {
        throw new Error(`Can't welcome`);
    }
};

// Doesn't nee authentication or JWT
users_routes.post('/create', createUser);
users_routes.get('/', welcome)

// this route is used to authenticate the user before dowing anything
users_routes.post('/authentication', authentication);


// all routes will verify token and permissions before allowing any action.
users_routes.patch('/indexNot', verifyToken, indexNotVerify);
users_routes.patch('/index', verifyToken, index);
users_routes.patch('/show/:username', verifyToken, showUser);
users_routes.delete('/delete', verifyToken, deleteUser);
users_routes.put('/update', verifyToken, updateUser);

export default users_routes;
