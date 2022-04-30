import * as modelsFunctions from '../models/main_models_functions'
import express from 'express';
import { isPresentInDB } from '../../helpers/helper_functions';
import { verifyToken, verifyUser } from '../service/main_authentication';

const main_routes = express.Router();

async function registerNew(req: express.Request, res: express.Response): Promise<void> {
    let proceed: boolean = true;
    const model_table = req.params.tableName;
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
                res.status(400);
                res.json(`This patient has clinical data already registered before, please update instead`);
            }
        } else {
            try {
                const data = await modelsFunctions.createNew(req);
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
async function showEntry(req: express.Request, res: express.Response): Promise<void> {
    const proceed = await isPresentInDB(req.params.tableName, req.body.data.filter.column, req.body.data.filter.value);
    if (proceed) {
        try {
            const data = await modelsFunctions.showOne(req);
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
async function showAll(req: express.Request, res: express.Response): Promise<void> {
    console.log(1);
    const proceed = await isPresentInDB(req.params.tableName, req.body.data.filter.column, req.body.data.filter.value);
    if (proceed) {
        try {
            let filtering = false;
            switch (req.params.tableName) {
                case 'users':
                case 'patients_personal':
                case 'clinics':
                    filtering = false;
                    break;
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
            const data = await modelsFunctions.showAll(req, filtering);
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
async function update(req: express.Request, res: express.Response): Promise<void> {
    const proceed = await isPresentInDB(req.params.tableName, req.body.data.filter.column, req.body.data.filter.value);
    if (proceed) {
        try {
            const data = await modelsFunctions.update(req);
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
async function deleteEntry(req: express.Request, res: express.Response): Promise<void> {
    const proceed = await isPresentInDB(req.params.tableName, req.body.data.filter.column, req.body.data.filter.value);
    if (proceed) {
        try {
            const data = await modelsFunctions.deleteEntry(req);
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



main_routes.post('/:tableName/registerentry', registerNew);
main_routes.patch('/:tableName/showone', verifyToken, showEntry);
main_routes.patch('/:tableName/showall', verifyToken, showAll);
main_routes.put('/:tableName/update', verifyToken, update);
main_routes.delete('/:tableName/delete', verifyToken, deleteEntry);



export default main_routes;