import * as SQLQueries from '../../helpers/createSQLString';
import * as modelsFunctions from '../../helpers/models_functions'
import express from 'express';
import * as tables from '../../config/tables_variables';
import { Clinical_Data_Type, clinical_data_class } from '../models/clinical_data';

const clinical_data_routes = express.Router();

async function registerNew(req: express.Request, res: express.Response): Promise<void> {
    try {
        const clinical_data = await modelsFunctions.createNew('clinical_data', tables.clinical_data_table, req.body);
        res.status(200);
        res.json(clinical_data);

    } catch (error) {
        throw new Error(`Can't register new clincal data: Handler Level: ${error}`);
    }
}
async function showEntry(req: express.Request, res: express.Response): Promise<void> {
    try {
        const clinical_data = await modelsFunctions.showOne('clinical_data', req.body.filterColumn, req.body.filterValue, req.body);
        res.status(200);
        res.json(clinical_data);
    } catch (error) {
        throw new Error(`Can't show entery: Handler Level : ${error}`);
    }
}
async function showAll(req: express.Request, res: express.Response): Promise<void> {
    try {
        const clinical_data = await modelsFunctions.showAll('clinical_data', req, true);
        res.status(200);
        res.json(clinical_data);
    } catch (error) {
        throw new Error(`Can't show entery: Handler Level : ${error}`);
    }
}
async function update(req: express.Request, res: express.Response): Promise<void> {
    try {
        console.log('Handler')
        const clinical_data = await modelsFunctions.update('clinical_data', req);
        res.status(200);
        res.json(clinical_data);

    } catch (error) {
        throw new Error(`Can't register new clincal data: Handler Level: ${error}`);
    }
}
async function deleteEntry(req: express.Request, res: express.Response): Promise<void> {
    try {
        const clinical_data = await modelsFunctions.deleteEntry('clinical_data', req);
        res.status(200);
        res.json(clinical_data);
    } catch (error) {
        throw new Error(`Can't show entery: Handler Level : ${error}`);
    }
}



clinical_data_routes.post('/registerentry', registerNew);
clinical_data_routes.get('/show', showEntry);
clinical_data_routes.get('/showall', showAll);
clinical_data_routes.put('/update', update);
clinical_data_routes.delete('/delete', deleteEntry);



export default clinical_data_routes;