import * as modelsFunctions from '../../helpers/models_functions_new'
import express from 'express';

const main_routes = express.Router();

async function registerNew(req: express.Request, res: express.Response): Promise<void> {
    try {
        const data = await modelsFunctions.createNew(req);
        res.status(200);
        res.json(data);

    } catch (error) {
        throw new Error(`Can't register new data: Handler Level: ${error}`);
    }
}
async function showEntry(req: express.Request, res: express.Response): Promise<void> {
    try {
        const data = await modelsFunctions.showOne(req);
        res.status(200);
        res.json(data);
    } catch (error) {
        throw new Error(`Can't show entery: Handler Level : ${error}`);
    }
}
async function showAll(req: express.Request, res: express.Response): Promise<void> {
    try {
        console.log(req.body);
        const data = await modelsFunctions.showAll(req, true);
        res.status(200);
        res.json(data);
    } catch (error) {
        throw new Error(`Can't showAll entries: Handler Level : ${error}`);
    }
}
async function update(req: express.Request, res: express.Response): Promise<void> {
    try {
        console.log('Handler')
        const data = await modelsFunctions.update(req);
        res.status(200);
        res.json(data);

    } catch (error) {
        throw new Error(`Can't update data: Handler Level: ${error}`);
    }
}
async function deleteEntry(req: express.Request, res: express.Response): Promise<void> {
    try {
        console.log()
        const data = await modelsFunctions.deleteEntry(req);
        res.status(200);
        res.json(data);
    } catch (error) {
        throw new Error(`Can't show entry: Handler Level : ${error}`);
    }
}



main_routes.post('/:tableName/registerentry', registerNew);
main_routes.get('/:tableName/show', showEntry);
main_routes.get('/:tableName/showall', showAll);
main_routes.put('/:tableName/update', update);
main_routes.delete('/:tableName/delete', deleteEntry);



export default main_routes;