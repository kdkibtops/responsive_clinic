import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import { setupData } from './config/config';
import users_routes from './API/handlers/users_handler';
import { testDB } from './database'
import main_routes from "./API/handlers/main_handler";
import path from 'path';
import complex_routes from "./API/handlers/complex_handler";
import { printHeaders } from './API/service/main_authentication' //MiddleWare to be used only for debugging

console.log('started');
const clinicApp = express();
clinicApp.use(bodyParser.urlencoded({ extended: false }));
clinicApp.use(bodyParser.json());
clinicApp.use(cors());

const port = setupData.server_port;
clinicApp.listen(port, startServer);

function startServer() {
    console.log(`Server started \nRunning on localhost:${port}`);
}
testDB();


clinicApp.use(express.static(path.join(__dirname, '../../../Front_end/src/', 'myWebSite')));
clinicApp.use('/users', /*printHeaders,*/ users_routes);
clinicApp.use('/main', /*printHeaders, */ main_routes);
clinicApp.use('/complex',/* printHeaders, */ complex_routes);
