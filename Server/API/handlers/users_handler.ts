import { User, users } from "../models/users";
import express from "express";
import { authenticateUser, getDataFromToken, passwordHashing, verifyToken, verifyUser } from "../service/authentication";

const _user_ = new users();
const users_routes = express.Router();

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
        const user_data = await getDataFromToken(req, res);
        const verification = await verifyUser(user_data.username, '', 'admin');
        if (verification === null) {
            res.status(401);
            res.json(`Verification failed, Username ${req.body.username} is not found in database`);
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
        const password_digest = passwordHashing(req.body.password as string);
        const newUser: User = {
            fullname: req.body.fullname,
            username: req.body.username,
            password: password_digest,
            role: req.body.role,
            degree: req.body.degree,
            email: req.body.email
        }
        const users__ = await _user_.createNewUser(newUser);
        res.json(users__);
    } catch (error) {
        throw new Error(`!Error at handler level!, Can't retrieve data: ${error}`);
    }
}

async function deleteUser(req: express.Request, res: express.Response): Promise<void> {
    try {
        const verification = await verifyUser(req.body.req_username);
        if (verification === null) {
            res.json(`Verification failed, Username ${req.body.req_username} is not found in database`);
        } else if (verification === true) {
            const users__ = await _user_.deleteUser(req.body.delete_username);
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
        const verification = await verifyUser(req.body.req_username);
        if (verification === null) {
            res.json(`Verification failed, Username ${req.body.req_username} is not found in database`);
        } else if (verification === true) {
            const users__ = await _user_.updateUser(req.body.update_username, req.body.updateField, req.body.updateValue);
            res.json(users__);
        } else if (verification === false) {
            res.json(`User verification failed`);
        }
    } catch (error) {
        throw new Error(`!Error at handler level!, Can't retrieve data: ${error}`);
    }
}

const welcome = async (
    req: express.Request,
    res: express.Response
): Promise<void> => {
    try {
        res.send('Welcome to the users section');
    } catch (error) {
        throw new Error(`Can't welcome`);
    }
};


users_routes.get('/indexNot', indexNotVerify);
users_routes.get('/index', index);
users_routes.get('/show/:username', verifyToken, showUser);
users_routes.post('/create', createUser);
users_routes.delete('/delete', authenticateUser, verifyToken, deleteUser);
users_routes.put('update', authenticateUser, verifyToken, updateUser);
users_routes.get('/', welcome)

export default users_routes;
