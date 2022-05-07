import bodyParser from "body-parser";
import cors from 'cors';
import express from 'express';
import * as clinicTypes from './config/clinicTypes';
import fetch from 'node-fetch';
import { setupData } from './config/config';
import { proxyVerifyToken, verifyToken } from "./API/service/main_authentication";

const proxyServer = express();
proxyServer.use(bodyParser.urlencoded({ extended: false }));
proxyServer.use(bodyParser.json());
proxyServer.use(cors());
const proxyPort = setupData.proxyPort;
proxyServer.listen(proxyPort, startProxyServer)
function startProxyServer() {
    console.log(`Proxy server started, running on localhost:${proxyPort}`);
}
let clients: clinicTypes.newProxyServerClient[] = [];

async function routingFunction(req: express.Request, res: express.Response) {
    try {
        const signedIn = checkLogin(req.hostname);
        let authenticated: boolean = false;
        let auth_verified: boolean = false;
        let JWT: string = '';
        let finalResponse;
        // if user is found in clients array of signed in users
        if (signedIn) {
            const JWT_verified = await proxyVerifyToken(req);
            if (JWT_verified) {
                auth_verified = true;
                JWT = req.headers.authorization as string
            } else {
                // if user is signed in but JWT was not provided, try authentication again
                auth_verified = false;
                const authRequest = creatAuth_HTMLRequest(req);
                const result = await newFetch(authRequest, '');
                if (result.status === 404 || result.status === 401) {
                    authenticated = false;
                    const x: clinicTypes.newProxyServerClient = {
                        name: req.hostname,
                        status: authenticated
                    }
                    clients.push(x);
                    auth_verified = authenticated
                } else if (result.status === 200) {
                    authenticated = true;
                    const x: clinicTypes.newProxyServerClient = {
                        name: req.hostname,
                        status: authenticated
                    }
                    auth_verified = authenticated
                    clients.push(x);
                    JWT = `BEARER ` + result.response;
                } else {
                    auth_verified = false;
                }
            }
        } else {
            // if client was not found in clients array, it will authenticate and put in array
            const authRequest = creatAuth_HTMLRequest(req);
            const result = await newFetch(authRequest, '');
            if (result.status === 404 || result.status === 401) {
                authenticated = false;
                const x: clinicTypes.newProxyServerClient = {
                    name: req.hostname,
                    status: authenticated
                }
                clients.push(x);
                auth_verified = authenticated
            } else if (result.status === 200) {
                authenticated = true;
                const x: clinicTypes.newProxyServerClient = {
                    name: req.hostname,
                    status: authenticated
                }
                auth_verified = authenticated
                clients.push(x);
                JWT = `BEARER ` + result.response;
            } else {
                auth_verified = false;
            }
        }
        if (auth_verified) {
            const newReq = creatHTML_Request(req)
            finalResponse = await newFetch(newReq, JWT);
            res.status(finalResponse.status);
            res.json(finalResponse.response);
            return;
        }
        else {
            finalResponse = 'Check login data and sign in again'
        }
        res.status(401)
        res.json(finalResponse);
    } catch (error) {
        throw new Error(`${error}`);
    }
}
// need to add table name in req.params
async function newFetch(htmlReq: clinicTypes.HTMLReq, JWT: string) {
    try {
        console.log(`JWT: ${JWT}`);
        let _url: string = '';
        const host = `http://${setupData.host}:${setupData.server_port}`;
        console.log(htmlReq.toDo)
        switch (htmlReq.toDo) {
            case 'authenticate':
                _url = '/users/authentication'
                break;
            case 'indexUsers':
                _url = '/users/index'
                break;
            case 'showUser':
                _url = `/users/show/${htmlReq.body.data.body.users?.username}`
                break;
            case 'registerPatient':
                _url = `/main/register`
                break;
            case 'showPatients':
                _url = '/main/patients_personal/showall'
                break;
            case 'showCBC':
                _url = '/main/cbc/showall'
                break;
            /*Write all routes here with their associated keywords */
        }
        const url = host + _url;
        console.log(`Started new Fetch function: ${htmlReq.method}`);
        console.log(url);
        const data = JSON.stringify(htmlReq.body);
        const result = await fetch(url, {
            method: htmlReq.method,
            headers: {
                'Content-type': 'application/json',
                authorization: JWT,
            },
            body: data,
        });
        console.log(result.status);
        const response = {
            response: await result.json(),
            status: result.status
        }
        return response;
    } catch (error) {
        throw new Error(`${error}`);
    }
}

function checkLogin(clientName: string): boolean {
    let signedIn: boolean = false;
    if (clients.length > 0) {
        clients.forEach(ele => {
            if (clientName === ele.name) {
                signedIn = ele.status;
            }
        })
    } else {
        signedIn = false
    }
    return signedIn
}
function creatAuth_HTMLRequest(req: express.Request): clinicTypes.HTMLReq {
    const username = req.body.body.user.username;
    const password = req.body.body.user.password;

    const authrizationRequest: clinicTypes.HTMLReq = {
        method: 'POST',
        toDo: 'authenticate',
        body: {
            data: {
                user: {
                    req_username: '',
                    username: username,
                    password: password,
                    req_JWT: ''
                },
                body: {
                    users: {
                        username: '',
                        password: ''
                    },
                },
                SQL: {},
                filter: {
                    columnsNeeded: ['*'], //no used till now
                    column: '',
                    value: ''
                }
            }
        }
    }
    return authrizationRequest
}
function creatHTML_Request(req: express.Request): clinicTypes.HTMLReq {

    const reqBody: clinicTypes.HTMLReq = req.body;
    const _body: clinicTypes.REQBODY = (req.body.body as clinicTypes.REQBODY);
    const newRequest: clinicTypes.HTMLReq = {
        method: reqBody.method,
        toDo: reqBody.toDo,
        body: reqBody.body
    }
    return newRequest
}


proxyServer.post('/proxy', routingFunction);
