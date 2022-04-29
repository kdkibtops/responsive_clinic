import { User, users } from "../models/users";
import express from "express";
import { authenticateUser, getDataFromToken, passwordHashing, verifyToken, verifyUser } from "../service/main_authentication";

const _user_ = new users();
const users_routes = express.Router();

// checks users credentials against database, if correct it will supply JWT to response
// JWT can be stored in localstorage or cookie for further sign in
async function authentication(req: express.Request, res: express.Response) {
    try {
        const JWT = await authenticateUser(req.body.data, res);
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
        const user_data = await getDataFromToken(req, res);
        const verification = await verifyUser(user_data.username, '', 'admin');
        if (verification === null) {
            res.status(404);
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
        const password_digest = passwordHashing(req.body.data.body.password as string);
        const newUser: User = {
            fullname: req.body.data.body.fullname,
            username: req.body.data.body.username,
            password: password_digest,
            role: req.body.data.body.role,
            degree: req.body.data.body.degree,
            email: req.body.data.body.email
        }
        const users__ = await _user_.createNewUser(newUser);
        res.json(users__);
    } catch (error) {
        throw new Error(`!Error at handler level!, Can't create user: ${error}`);
    }
}
async function deleteUser(req: express.Request, res: express.Response): Promise<void> {
    try {
        const verification = await verifyUser(req.body.req_username);
        if (verification === null) {
            res.json(`Verification failed, Username ${req.body.req_username} is not found in database`);
        } else if (verification === true) {
            const users__ = await _user_.deleteUser(req.body.username);
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
            const users__ = await _user_.updateUser(req.body.username, req.body.updateField, req.body.updateValue);
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
