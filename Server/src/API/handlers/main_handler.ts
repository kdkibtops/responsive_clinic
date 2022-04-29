import * as modelsFunctions from '../models/main_models_functions'
import express from 'express';
import { isPresentInDB } from '../../helpers/helper_functions';

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
        case 'patient_plan': {
            proceed = await isPresentInDB('patients_personal', req.body.data.filter.column, req.body.data.filter.value);
            break;
        }
        // checks if patiet is already present in DB
        case 'patients_personal':
            proceed = ! await isPresentInDB('patients_personal', req.body.data.filter.column, req.body.data.filter.value);
            break;
    }
    if (proceed) {
        try {
            const data = await modelsFunctions.createNew(req);
            res.status(200);
            res.json(data);

        } catch (error) {
            throw new Error(`Can't register new data: Handler Level: ${error}`);
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
    const proceed = await isPresentInDB(req.params.tableName, req.body.data.filter.column, req.body.data.filter.value);
    if (proceed) {
        try {
            const data = await modelsFunctions.showAll(req, true);
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
main_routes.patch('/:tableName/show', showEntry);
main_routes.patch('/:tableName/showall', showAll);
main_routes.put('/:tableName/update', update);
main_routes.delete('/:tableName/delete', deleteEntry);



export default main_routes;