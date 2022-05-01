// This module will be used to replace all models, instead we will pass the table name and request from the handler directly
import * as SQLqueries from '../../helpers/createSQLString';
import client from "../../database";
import exrpess from 'express';
import { CBC, MRI, USERS, PATIENT_PLAN, PATIENTS_PERSONAL, PATIENTS_VISITS, RESECTION, RFA, TACE, TUMOR_MARKERS, ULTRASOUND, USERS_LOGIN, CHEMISTRY, CLINICAL_DATA, CLINICS, CT, VIROLOGY } from '../../config/clinicTypes'
import * as clinicTypes from '../../config/clinicTypes';


export async function createNew(req: exrpess.Request): Promise<CBC | MRI | USERS | PATIENT_PLAN | PATIENTS_PERSONAL | PATIENTS_VISITS | RESECTION | RFA | TACE | TUMOR_MARKERS | ULTRASOUND | USERS_LOGIN | CHEMISTRY | CLINICAL_DATA | CLINICS | CT | VIROLOGY> {
    try {
        const conn = await client.connect();
        let enteries: string[] = [];
        let columnNames: string[] = [];
        const requestBody = req.body.data.body
        for (const value in requestBody) {
            if (value !== 'filterColumn' && value !== 'filterValue') {
                enteries.push(requestBody[value as keyof typeof requestBody] as string);
                columnNames.push(value);
            }
        }

        const SQL = SQLqueries.createSQLinsert(req.params.tableName, columnNames, enteries);
        const response = await conn.query(SQL);
        conn.release();
        const result = response.rows[0];
        return result;
    } catch (error) {
        throw new Error(`Can't create entery: Model Level; ${req.params.tableName}: ${error}`);
    }
}
export async function showOne(req: exrpess.Request): Promise<CBC | MRI | USERS | PATIENT_PLAN | PATIENTS_PERSONAL | PATIENTS_VISITS | RESECTION | RFA | TACE | TUMOR_MARKERS | ULTRASOUND | USERS_LOGIN | CHEMISTRY | CLINICAL_DATA | CLINICS | CT | VIROLOGY> {
    try {
        const conn = await client.connect();
        let columnsNames: string[] = [];
        for (const value in req.body.data.body) {
            if (value !== 'filterColumn' && value !== 'filterValue') {
                columnsNames.push(value);
            }
        }

        const filter = req.body.data.filter;
        const SQL = SQLqueries.createSQLshowOneOnly(req.params.tableName, filter.column, filter.value, columnsNames);
        console.log(SQL);
        const response = await conn.query(SQL);
        conn.release();
        const result = response.rows[0];
        return result;
    } catch (error) {
        throw new Error(`Can't showOnlyOne: Model Level: ${error}`);
    }
}
// filter is used to determine whether the caller handler will need filter or not
export async function showAll(req: exrpess.Request, filter: boolean): Promise<CBC[] | MRI[] | USERS[] | PATIENT_PLAN[] | PATIENTS_PERSONAL[] | PATIENTS_VISITS[] | RESECTION[] | RFA[] | TACE[] | TUMOR_MARKERS[] | ULTRASOUND[] | USERS_LOGIN[] | CHEMISTRY[] | CLINICAL_DATA[] | CLINICS[] | CT[] | VIROLOGY[]> {
    try {
        const conn = await client.connect();
        let columnsName: string[] = [];
        let SQL: string = '';
        for (const value in req.body.data.body) {
            if (value !== 'filterColumn' && value !== 'filterValue') {
                columnsName.push(value);
            }
        }
        const filter_data = req.body.data.filter;
        if (filter) {
            SQL = SQLqueries.createSQLshowAll(req.params.tableName, columnsName, [`${filter_data.column}`, `${filter_data.value}`]);

        } else {
            SQL = SQLqueries.createSQLshowAll(req.params.tableName, columnsName);

        }
        console.log(SQL);
        const response = await conn.query(SQL);
        conn.release();
        const result = response.rows;
        return result;
    } catch (error) {
        throw new Error(`Can't showAll: Model Level: ${error}`);

    }
}
export async function update(req: exrpess.Request, notIntended?: boolean): Promise<CBC | MRI | USERS | PATIENT_PLAN | PATIENTS_PERSONAL | PATIENTS_VISITS | RESECTION | RFA | TACE | TUMOR_MARKERS | ULTRASOUND | USERS_LOGIN | CHEMISTRY | CLINICAL_DATA | CLINICS | CT | VIROLOGY> {
    if (notIntended) {
        console.log('not intended')
    }
    try {
        let enteries: string[] = [];
        let columnNames: string[] = [];
        const requestBody = req.body.data.body.data;
        const filter = req.body.data.filter;
        for (const value in requestBody) {
            if (value !== 'filterColumn' && value !== 'filterValue') {
                enteries.push(requestBody[value as keyof typeof requestBody] as string);
                columnNames.push(value);
            }
        }
        const conn = await client.connect();
        const SQL = SQLqueries.createSQLupdate(req.params.tableName, columnNames, enteries, filter.column, filter.value)
        console.log(SQL);
        const response = await conn.query(SQL);
        conn.release();
        const result = response.rows[0];
        return result
    } catch (error) {
        throw new Error(`Can't update: Model Level: ${error}`);
    }

}
export async function deleteEntry(req: exrpess.Request): Promise<CBC | MRI | USERS | PATIENT_PLAN | PATIENTS_PERSONAL | PATIENTS_VISITS | RESECTION | RFA | TACE | TUMOR_MARKERS | ULTRASOUND | USERS_LOGIN | CHEMISTRY | CLINICAL_DATA | CLINICS | CT | VIROLOGY> {
    try {
        const conn = await client.connect();
        const filter = req.body.data.filter;
        const SQL = SQLqueries.createSQLdelete(req.params.tableName, filter.column, filter.value);
        console.log(SQL);
        const response = await conn.query(SQL);
        conn.release();
        const result = response.rows[0];
        return result
    } catch (error) {
        throw new Error(`Can't delete: Model Level: ${error}`);

    }
}

// to be used only while creating new user from scratch
export async function createNewUser(req: clinicTypes.REQBODY) {
    try {
        const SQLarr = clinicTypes.iterateThroughReqBody(req);
        const conn = await client.connect();
        for (let i = 0; i < SQLarr.length; i++) {
            const result = await conn.query(SQLarr[i]);
        }
        conn.release();
    } catch (err) {
        throw new Error(`${err}`);
    }
}
