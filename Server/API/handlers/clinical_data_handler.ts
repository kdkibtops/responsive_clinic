import * as SQLQueries from '../../helpers/createSQLString';
import express from 'express';
import * as tables from '../../config/tables_variables';
import { Clinical_Data_Type, clinical_data_class } from '../models/clinical_data';

const __clinical_data__ = new clinical_data_class;
const clinical_data_routes = express.Router();

// async function registerNew(req: express.Request, res: express.Response): Promise<void> {
//     try {
//         console.log('Handler');
//         let newDataArr: string[] = [];
//         for (const column in req.body) {
//             newDataArr.push(req.body[column] as keyof typeof req.body as string);
//         }
//         console.log(newDataArr);
//         const clinical_data = __clinical_data__.createNewEntry(newDataArr);
//         res.status(200);
//         res.json(clinical_data);

//     } catch (error) {
//         throw new Error(`Can't register new clincal data: Handler Level: ${error}`);
//     }
// }
async function registerNew(req: express.Request, res: express.Response): Promise<void> {
    try {
        const clinical_data = await SQLQueries.createNew('clinical_data', tables.clinical_data_table, req.body);
        res.status(200);
        res.json(clinical_data);

    } catch (error) {
        throw new Error(`Can't register new clincal data: Handler Level: ${error}`);
    }
}


clinical_data_routes.post('/registerentry', registerNew);

export default clinical_data_routes;