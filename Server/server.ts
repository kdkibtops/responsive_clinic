import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import { setupData } from './config/config';
import users_routes from './API/handlers/users_handler';
import authentication_routes from './API/handlers/authentication_handler';
import { testDB } from './database'
import clinics_routes from "./API/handlers/clinics_handler";
import patients_routes from "./API/handlers/patients_handler";
import clinical_data_routes from "./API/handlers/clinical_data_handler";
import cbc_routes from "./API/handlers/cbc_handler";
import chemistry_routes from "./API/handlers/chemistry_handler";
import virology_routes from "./API/handlers/virology_handler";
import tumor_markers_routes from "./API/handlers/tumor_markers_handler";
import main_routes from "./MAIN_API/main_handler";



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
clinicApp.use('/patients', patients_routes);
clinicApp.use('/patients/clinicalData', clinical_data_routes);
clinicApp.use('/patients/laboratory/cbc', cbc_routes);
clinicApp.use('/patients/laboratory/chemistry', chemistry_routes);
clinicApp.use('/patients/laboratory/virology', virology_routes);
clinicApp.use('/patients/laboratory/tumor_markers', tumor_markers_routes);
clinicApp.use('/main', main_routes);
