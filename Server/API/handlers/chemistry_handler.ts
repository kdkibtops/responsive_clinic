import * as modelsFunctions from '../../helpers/models_functions'
import express from 'express';

const chemistry_routes = express.Router();

async function registerNew(req: express.Request, res: express.Response): Promise<void> {
    try {
        const chemistry = await modelsFunctions.createNew('chemistry', req);
        res.status(200);
        res.json(chemistry);

    } catch (error) {
        throw new Error(`Can't register new clincal data: Handler Level: ${error}`);
    }
}
async function showEntry(req: express.Request, res: express.Response): Promise<void> {
    try {
        const chemistry = await modelsFunctions.showOne('chemistry', req.body.filterColumn, req.body.filterValue, req.body);
        res.status(200);
        res.json(chemistry);
    } catch (error) {
        throw new Error(`Can't show entery: Handler Level : ${error}`);
    }
}
async function showAll(req: express.Request, res: express.Response): Promise<void> {
    try {
        const chemistry = await modelsFunctions.showAll('chemistry', req, true);
        res.status(200);
        res.json(chemistry);
    } catch (error) {
        throw new Error(`Can't show entery: Handler Level : ${error}`);
    }
}
async function update(req: express.Request, res: express.Response): Promise<void> {
    try {
        console.log('Handler')
        const chemistry = await modelsFunctions.update('chemistry', req);
        res.status(200);
        res.json(chemistry);

    } catch (error) {
        throw new Error(`Can't register new clincal data: Handler Level: ${error}`);
    }
}
async function deleteEntry(req: express.Request, res: express.Response): Promise<void> {
    try {
        console.log()
        const chemistry = await modelsFunctions.deleteEntry('chemistry', req);
        res.status(200);
        res.json(chemistry);
    } catch (error) {
        throw new Error(`Can't show entery: Handler Level : ${error}`);
    }
}



chemistry_routes.post('/registerentry', registerNew);
chemistry_routes.get('/show', showEntry);
chemistry_routes.get('/showall', showAll);
chemistry_routes.put('/update', update);
chemistry_routes.delete('/delete', deleteEntry);



export default chemistry_routes;