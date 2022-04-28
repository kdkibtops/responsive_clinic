import * as modelsFunctions from '../../helpers/models_functions'
import express from 'express';

const tumor_markers_routes = express.Router();

async function registerNew(req: express.Request, res: express.Response): Promise<void> {
    try {
        const tumor_markers = await modelsFunctions.createNew('tumor_markers', req);
        res.status(200);
        res.json(tumor_markers);

    } catch (error) {
        throw new Error(`Can't register new clincal data: Handler Level: ${error}`);
    }
}
async function showEntry(req: express.Request, res: express.Response): Promise<void> {
    try {
        const tumor_markers = await modelsFunctions.showOne('tumor_markers', req.body.filterColumn, req.body.filterValue, req);
        res.status(200);
        res.json(tumor_markers);
    } catch (error) {
        throw new Error(`Can't show entery: Handler Level : ${error}`);
    }
}
async function showAll(req: express.Request, res: express.Response): Promise<void> {
    try {
        const tumor_markers = await modelsFunctions.showAll('tumor_markers', req, true);
        res.status(200);
        res.json(tumor_markers);
    } catch (error) {
        throw new Error(`Can't show entery: Handler Level : ${error}`);
    }
}
async function update(req: express.Request, res: express.Response): Promise<void> {
    try {
        console.log('Handler')
        const tumor_markers = await modelsFunctions.update('tumor_markers', req);
        res.status(200);
        res.json(tumor_markers);

    } catch (error) {
        throw new Error(`Can't register new clincal data: Handler Level: ${error}`);
    }
}
async function deleteEntry(req: express.Request, res: express.Response): Promise<void> {
    try {
        console.log()
        const tumor_markers = await modelsFunctions.deleteEntry('tumor_markers', req);
        res.status(200);
        res.json(tumor_markers);
    } catch (error) {
        throw new Error(`Can't show entery: Handler Level : ${error}`);
    }
}



tumor_markers_routes.post('/registerentry', registerNew);
tumor_markers_routes.get('/show', showEntry);
tumor_markers_routes.get('/showall', showAll);
tumor_markers_routes.put('/update', update);
tumor_markers_routes.delete('/delete', deleteEntry);



export default tumor_markers_routes;