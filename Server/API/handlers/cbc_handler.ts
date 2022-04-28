import * as modelsFunctions from '../../helpers/models_functions'
import express from 'express';

const cbc_routes = express.Router();

async function registerNew(req: express.Request, res: express.Response): Promise<void> {
    try {
        const cbc = await modelsFunctions.createNew('cbc', req);
        res.status(200);
        res.json(cbc);

    } catch (error) {
        throw new Error(`Can't register new clincal data: Handler Level: ${error}`);
    }
}
async function showEntry(req: express.Request, res: express.Response): Promise<void> {
    try {
        const cbc = await modelsFunctions.showOne('cbc', req.body.filterColumn, req.body.filterValue, req.body);
        res.status(200);
        res.json(cbc);
    } catch (error) {
        throw new Error(`Can't show entery: Handler Level : ${error}`);
    }
}
async function showAll(req: express.Request, res: express.Response): Promise<void> {
    try {
        const cbc = await modelsFunctions.showAll('cbc', req, true);
        res.status(200);
        res.json(cbc);
    } catch (error) {
        throw new Error(`Can't show entery: Handler Level : ${error}`);
    }
}
async function update(req: express.Request, res: express.Response): Promise<void> {
    try {
        console.log('Handler')
        const cbc = await modelsFunctions.update('cbc', req);
        res.status(200);
        res.json(cbc);

    } catch (error) {
        throw new Error(`Can't register new clincal data: Handler Level: ${error}`);
    }
}
async function deleteEntry(req: express.Request, res: express.Response): Promise<void> {
    try {
        console.log()
        const cbc = await modelsFunctions.deleteEntry('cbc', req);
        res.status(200);
        res.json(cbc);
    } catch (error) {
        throw new Error(`Can't show entery: Handler Level : ${error}`);
    }
}



cbc_routes.post('/registerentry', registerNew);
cbc_routes.get('/show', showEntry);
cbc_routes.get('/showall', showAll);
cbc_routes.put('/update', update);
cbc_routes.delete('/delete', deleteEntry);



export default cbc_routes;