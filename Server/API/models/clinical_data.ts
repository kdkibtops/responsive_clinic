import * as sqlQueries from '../../helpers/createSQLString';
import client from '../../database';
import { checkPatientInDB } from '../../helpers/helper_functions';
import * as tables from '../../config/tables_variables';

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
    async createNewEntry(newClinicalData: string[]): Promise<Clinical_Data_Type | null> {
        const patientPresent = await checkPatientInDB(newClinicalData[0])
        if (patientPresent) {
            try {
                console.log('Model')
                const conn = await client.connect();
                const SQL = sqlQueries.createSQLinsert('clinical_data', tables.clinical_data_table, newClinicalData)
                console.log(SQL);
                const response = await conn.query(SQL);
                conn.release();
                const result = response.rows[0];
                return result;
            } catch (error) {
                throw new Error(`Can't create new clinical data entry: Handler Level: ${error}`);
            }
        } else {
            return null;
        }
    }
}