import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import { setupData } from './config/config';
import users_routes from './API/handlers/users_handler';
import authentication_routes from './API/handlers/authentication_handler';
import { testDB } from './database'
import clinics_routes from "./API/handlers/clinics_handler";



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
clinicApp.use(express.static('myWebsite'));
clinicApp.use('/users', users_routes);
clinicApp.use('', authentication_routes);
clinicApp.use('/clinics', clinics_routes);
