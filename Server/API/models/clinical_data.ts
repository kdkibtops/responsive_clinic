import * as sqlQueries from '../../helpers/createSQLString';
import client from '../../database';
import { checkPatientInDB } from '../../helpers/helper_functions';
import * as tables from '../../config/tables_variables';
import { isKeyObject } from 'util/types';

export type Clinical_Data_Type = {
    id?: string,
    patient_id: string,
    patient_national_id: string,
    dm?: string,
    htn?: string,
    hcv?: string,
    hbv?: string,
    hiv?: string,
    hcv_vriology?: string,
    hbv_virology?: string,
    hiv_virology?: string,
    ckd?: string,
    disability?: string,
    cardiac?: string
}

export class clinical_data_class {
    async createNewEntry(newClinicalData: Clinical_Data_Type): Promise<void> {
        try {
            // const conn = await client.connect();
            let newColumns = [];
            let newEntries = [];
            for (const column in newClinicalData) {
                newColumns.push(column);
                newEntries.push(newClinicalData[column]);
            }
            const SQL = sqlQueries.createSQLinsert('clinical_data', tables.clinical_data_table, [])
            console.log(SQL);
            // const response = await conn.query(SQL);
            // conn.release();
            // const result = response.rows[0];
            // return result;
        } catch (error) {
            throw new Error(`Can't create new clinical data entry: Handler Level: ${error}`);
        }
    }
}