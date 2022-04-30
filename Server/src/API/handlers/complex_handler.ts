import * as modelsFunctions from '../models/main_models_functions';
import * as complexFunctions from '../models/complex_models';
import express from 'express';
import { isPresentInDB } from '../../helpers/helper_functions';
import { verifyToken } from '../service/main_authentication';

const complex_routes = express.Router();

async function getClinicPatients(req: express.Request, res: express.Response): Promise<void> {
    try {
        const data = await complexFunctions.getClinicPatients(req, res);
        res.status(200);
        res.json(data);
    } catch (error) {
        throw new Error(`Can't get clinicPatients: Handler Level: ${error}`);
    }
}



complex_routes.get('/:clinicID', verifyToken, getClinicPatients);
export default complex_routes;