// This module will be used to replace all models, instead we will pass the table name and request from the handler directly
import * as SQLqueries from '../../helpers/createSQLString';
import client from "../../database";
import exrpess from 'express';
import { CBC, MRI, USERS, PATIENT_PLAN, PATIENTS_PERSONAL, PATIENTS_VISITS, RESECTION, RFA, TACE, TUMOR_MARKERS, ULTRASOUND, USERS_LOGIN, CHEMISTRY, CLINICAL_DATA, CLINICS, CT, VIROLOGY } from '../../config/clinicTypes'
import * as clinicTypes from '../../config/clinicTypes';

//Debugged
export async function createNew(tableName: string, reqBody: clinicTypes.REQBODY): Promise<CBC | MRI | USERS | PATIENT_PLAN | PATIENTS_PERSONAL | PATIENTS_VISITS | RESECTION | RFA | TACE | TUMOR_MARKERS | ULTRASOUND | USERS_LOGIN | CHEMISTRY | CLINICAL_DATA | CLINICS | CT | VIROLOGY> {
    try {
        const conn = await client.connect();
        let enteries: string[] = [];
        let columnNames: string[] = [];
        const lastBody = reqBody.data.body[tableName as keyof typeof reqBody.data.body];
        for (const value in lastBody) {
            if (value !== 'filterColumn' && value !== 'filterValue') {
                enteries.push(lastBody[value as keyof typeof lastBody] as string);
                columnNames.push(value);
            }
        }
        const SQL = SQLqueries.createSQLinsert(tableName, columnNames, enteries);
        const response = await conn.query(SQL);
        conn.release();
        const result = response.rows[0];
        return result;
    } catch (error) {
        throw new Error(`Can't create entery: Model Level; ${tableName}: ${error}`);
    }
}
//Debugged
export async function showOne(tableName: string, reqBody: clinicTypes.REQBODY): Promise<CBC | MRI | USERS | PATIENT_PLAN | PATIENTS_PERSONAL | PATIENTS_VISITS | RESECTION | RFA | TACE | TUMOR_MARKERS | ULTRASOUND | USERS_LOGIN | CHEMISTRY | CLINICAL_DATA | CLINICS | CT | VIROLOGY> {
    try {
        const conn = await client.connect();
        let columnsNames: string[] = [];
        const lastBody = reqBody.data.body[tableName as keyof typeof reqBody.data.body];
        for (const value in lastBody) {
            columnsNames.push(value);
        }
        const filter = reqBody.data.filter;
        const sorting = reqBody.data.filter.orderBy || 'date';
        const SQL = SQLqueries.createSQLshowOneOnly(tableName, filter.column, filter.value, columnsNames, sorting);
        console.log(SQL);
        const response = await conn.query(SQL);
        conn.release();
        const result = response.rows[0];
        return result;
    } catch (error) {
        throw new Error(`Can't showOnlyOne: Model Level: ${error}`);
    }
}

// Pending Debug
// filter is used to determine whether the caller handler will need filter or not
export async function showAll(tableName: string, reqBody: clinicTypes.REQBODY, filtering: boolean): Promise<CBC[] | MRI[] | USERS[] | PATIENT_PLAN[] | PATIENTS_PERSONAL[] | PATIENTS_VISITS[] | RESECTION[] | RFA[] | TACE[] | TUMOR_MARKERS[] | ULTRASOUND[] | USERS_LOGIN[] | CHEMISTRY[] | CLINICAL_DATA[] | CLINICS[] | CT[] | VIROLOGY[]> {
    try {
        const conn = await client.connect();
        let columnsNames: string[] = [];
        const lastBody = reqBody.data.body[tableName as keyof typeof reqBody.data.body];
        let SQL: string = '';
        for (const value in lastBody) {
            columnsNames.push(value);
        }
        const filter = reqBody.data.filter;
        if (filtering) {
            SQL = SQLqueries.createSQLshowAll(tableName, columnsNames, [`${filter.column}`, `${filter.value}`]);
        } else {
            SQL = SQLqueries.createSQLshowAll(tableName, columnsNames);
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
//Debugged
export async function update(tableName: string, reqBody: clinicTypes.REQBODY, notIntended?: boolean): Promise<CBC | MRI | USERS | PATIENT_PLAN | PATIENTS_PERSONAL | PATIENTS_VISITS | RESECTION | RFA | TACE | TUMOR_MARKERS | ULTRASOUND | USERS_LOGIN | CHEMISTRY | CLINICAL_DATA | CLINICS | CT | VIROLOGY> {
    if (notIntended) {
        console.log('not intended')
    }
    try {
        let enteries: string[] = [];
        let columnNames: string[] = [];
        const lastBody = reqBody.data.body[tableName as keyof typeof reqBody.data.body];
        const filter = reqBody.data.filter;
        for (const value in lastBody) {
            enteries.push(lastBody[value as keyof typeof lastBody] as string);
            columnNames.push(value);
        }
        const conn = await client.connect();
        const SQL = SQLqueries.createSQLupdate(tableName, columnNames, enteries, filter.column, filter.value);
        console.log(SQL);
        const response = await conn.query(SQL);
        conn.release();
        const result = response.rows[0];
        return result
    } catch (error) {
        throw new Error(`Can't update: Model Level: ${error}`);
    }

}
//Debugged
export async function deleteEntry(tableName: string, reqBody: clinicTypes.REQBODY): Promise<CBC | MRI | USERS | PATIENT_PLAN | PATIENTS_PERSONAL | PATIENTS_VISITS | RESECTION | RFA | TACE | TUMOR_MARKERS | ULTRASOUND | USERS_LOGIN | CHEMISTRY | CLINICAL_DATA | CLINICS | CT | VIROLOGY> {
    try {
        const conn = await client.connect();
        const filter = reqBody.data.filter;
        const SQL = SQLqueries.createSQLdelete(tableName, filter.column, filter.value);
        console.log(SQL);
        const response = await conn.query(SQL);
        conn.release();
        const result = response.rows[0];
        return result
    } catch (error) {
        throw new Error(`Can't delete: Model Level: ${error}`);

    }
}

//Debugged
// to be used only while creating new user from scratch
export async function createNewUser(reqBody: clinicTypes.REQBODY) {
    try {
        const SQLarr = clinicTypes.iterateThroughReqBody(reqBody);
        const conn = await client.connect();
        for (let i = 0; i < SQLarr.length; i++) {
            const result = await conn.query(SQLarr[i]);
        }
        conn.release();
    } catch (err) {
        throw new Error(`${err}`);
    }
}
