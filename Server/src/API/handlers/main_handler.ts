import * as modelsFunctions from '../models/main_models_functions'
import express from 'express';
import { isPresentInDB } from '../../helpers/helper_functions';
import { verifyToken, verifyUser } from '../service/main_authentication';
import * as clinicTypes from '../../config/clinicTypes';

const main_routes = express.Router();

//Debugged
async function registerNew(req: express.Request, res: express.Response): Promise<void> {
    let proceed: boolean = true;
    const model_table = req.params.tableName;
    if (req.body.data.filter.column === 'pat_nat_id') {
        req.body.data.filter.value = req.body.data.body[model_table].pat_nat_id;
    }
    switch (model_table) {
        case 'clinical_data':
        case 'cbc':
        case 'chemistry':
        case 'virology':
        case 'tumor_markers':
        case 'mri':
        case 'us':
        case 'ct':
        case 'tace':
        case 'rfa':
        case 'resection':
        case 'patients_visits':
        case 'patient_plan': {
            proceed = await isPresentInDB('patients_personal', req.body.data.filter.column, req.body.data.filter.value);
            break;
        }
        // checks if patiet is already present in DB
        case 'patients_personal':
            proceed = ! await isPresentInDB('patients_personal', req.body.data.filter.column, req.body.data.filter.value);
            break;
    }
    console.log(`proceed:${proceed}`);
    if (proceed) {
        if (req.params.tableName === 'clinical_data') {

            let clinicalDataPresent = await isPresentInDB('clinical_data', req.body.data.filter.column, req.body.data.filter.value);
            if (clinicalDataPresent) {
                // I should add warning message to user asking for permission to update data
                await modelsFunctions.update(req.params.tableName, req.body, true);
                console.log(`updated clinical data`);
                res.status(200);
                res.json(`updated clinical data`);
            }
        } else {
            try {
                const data = await modelsFunctions.createNew(req.params.tableName, req.body);
                res.status(200);
                res.json(data);
            } catch (error) {
                throw new Error(`Can't register new data: Handler Level: ${error}`);
            }
        }
    } else if (!proceed && model_table === 'patients_personal') {
        res.status(400);
        res.json(`Patient is already registered in database`);
    }
    else {
        res.status(404);
        res.json(`Patient is not found`);
    }

}
//Debugged
async function showEntry(req: express.Request, res: express.Response): Promise<void> {
    const proceed = await isPresentInDB(req.params.tableName, req.body.data.filter.column, req.body.data.filter.value);
    console.log(proceed);
    if (proceed) {
        try {
            const data = await modelsFunctions.showOne(req.params.tableName, req.body);
            res.status(200);
            res.json(data);
        } catch (error) {
            throw new Error(`Can't show entry: Handler Level : ${error}`);
        }
    } else {
        res.status(404);
        res.json(`Requested data is not found`);
    }

}

// Pending Debug
async function showAll(req: express.Request, res: express.Response): Promise<void> {
    const reqBody = req.body as clinicTypes.REQBODY;
    if (req.params.tableName === 'users') {
        reqBody.data.filter.column = 'username'
        reqBody.data.filter.value = reqBody.data.user.req_username;
    }
    console.log(reqBody.data.filter.column)
    console.log(reqBody.data.filter.value)
    const proceed = await isPresentInDB(req.params.tableName, reqBody.data.filter.column, reqBody.data.filter.value);
    if (proceed) {
        try {
            let filtering = false;
            switch (req.params.tableName) {
                case 'users':
                    filtering = false;
                    break;
                case 'patients_personal':
                case 'clinics':
                case 'cbc':
                case ' mri':
                case 'patient_plan':
                case 'patients_visits':
                case 'resection':
                case 'rfa':
                case 'tace':
                case 'tumor_markers':
                case 'ultrasound':
                case 'users_login':
                case 'chemistry':
                case 'clinical_data':
                case 'ct':
                case 'virology':
                    filtering = true;
                    break;

            }
            console.log(`Filtering: ${filtering}`);
            const data = await modelsFunctions.showAll(req.params.tableName, req.body, filtering);
            res.status(200);
            res.json(data);
        } catch (error) {
            throw new Error(`Can't showAll entries: Handler Level : ${error}`);
        }
    } else {
        res.status(404);
        res.json(`Requested data is not found`);
    }
}
//Debugged
async function update(req: express.Request, res: express.Response): Promise<void> {
    const proceed = await isPresentInDB(req.params.tableName, req.body.data.filter.column, req.body.data.filter.value);
    if (proceed) {
        try {
            const data = await modelsFunctions.update(req.params.tableName, req.body);
            res.status(200);
            res.json(data);

        } catch (error) {
            throw new Error(`Can't update data: Handler Level: ${error}`);
        }
    } else {
        res.status(404);
        res.json(`Requested data is not found`);
    }
}
//Debugged
async function deleteEntry(req: express.Request, res: express.Response): Promise<void> {
    const model_table = req.params.tableName;
    if (req.body.data.filter.column === 'pat_nat_id') {
        // I should add warning message to user confirming to delete all enteries associated with pat_nat_id in the table
        req.body.data.filter.value = req.body.data.body[model_table].pat_nat_id;
    } else if (req.body.data.filter.column === '') {
        res.status(400);
        res.json(`No filter data available, please select which enteries to delete!`);
    } else {
        const proceed = await isPresentInDB(req.params.tableName, req.body.data.filter.column, req.body.data.filter.value);
        if (proceed) {
            try {
                const data = await modelsFunctions.deleteEntry(req.params.tableName, req.body);
                res.status(200);
                res.json(data);
            } catch (error) {
                throw new Error(`Can't show entry: Handler Level : ${error}`);
            }
        } else {
            res.status(404);
            res.json(`Requested data is not found`);
        }
    }
}

// Debugged
// to be used only while creating new user from scratch or registering multiple tables at once
async function registerNewPatientEntries(req: express.Request, res: express.Response): Promise<void> {
    try {
        await modelsFunctions.createNewUser(req.body);
        res.status(200);
        res.json(`Registered new patient successfully`);
    } catch (error) {
        throw new Error(`Can't register patient: Handler Level : ${error}`);
    }
}


main_routes.post('/:tableName/registeroneentry', verifyToken, registerNew);
main_routes.patch('/:tableName/showone', verifyToken, showEntry);
main_routes.patch('/:tableName/showall', verifyToken, showAll);
main_routes.put('/:tableName/update', verifyToken, update);
main_routes.delete('/:tableName/delete', verifyToken, deleteEntry);

main_routes.post('/register', verifyToken, registerNewPatientEntries);




export default main_routes;