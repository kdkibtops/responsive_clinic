import * as modelsFunctions from '../../helpers/models_functions'
import express from 'express';

const virology_routes = express.Router();

async function registerNew(req: express.Request, res: express.Response): Promise<void> {
    try {
        const virology = await modelsFunctions.createNew('virology', req);
        res.status(200);
        res.json(virology);

    } catch (error) {
        throw new Error(`Can't register new clincal data: Handler Level: ${error}`);
    }
}
async function showEntry(req: express.Request, res: express.Response): Promise<void> {
    try {
        const virology = await modelsFunctions.showOne('virology', req.body.filterColumn, req.body.filterValue, req.body);
        res.status(200);
        res.json(virology);
    } catch (error) {
        throw new Error(`Can't show entery: Handler Level : ${error}`);
    }
}
async function showAll(req: express.Request, res: express.Response): Promise<void> {
    try {
        const virology = await modelsFunctions.showAll('virology', req, true);
        res.status(200);
        res.json(virology);
    } catch (error) {
        throw new Error(`Can't show entery: Handler Level : ${error}`);
    }
}
async function update(req: express.Request, res: express.Response): Promise<void> {
    try {
        console.log('Handler')
        const virology = await modelsFunctions.update('virology', req);
        res.status(200);
        res.json(virology);

    } catch (error) {
        throw new Error(`Can't register new clincal data: Handler Level: ${error}`);
    }
}
async function deleteEntry(req: express.Request, res: express.Response): Promise<void> {
    try {
        console.log()
        const virology = await modelsFunctions.deleteEntry('virology', req);
        res.status(200);
        res.json(virology);
    } catch (error) {
        throw new Error(`Can't show entery: Handler Level : ${error}`);
    }
}



virology_routes.post('/registerentry', registerNew);
virology_routes.get('/show', showEntry);
virology_routes.get('/showall', showAll);
virology_routes.put('/update', update);
virology_routes.delete('/delete', deleteEntry);



export default virology_routes;