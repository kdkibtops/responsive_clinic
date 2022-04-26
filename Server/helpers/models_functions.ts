// This module will be used to replace all models, instead we will pass the table name and request from the handler directly
import * as SQLqueries from './createSQLString';
import client from "../database";
import exrpess from 'express';
import { Patient } from "../API/models/patients";
import { Clinic } from "../API/models/clinics";

export async function createNew(tableName: string, columnsName: string[], requestBody: exrpess.Request): Promise<Patient | Clinic> {
    try {
        const conn = await client.connect();
        let enteries: string[] = [];
        let columnNames: string[] = [];
        console.log(requestBody);
        for (const value in requestBody) {
            enteries.push(requestBody[value as keyof typeof requestBody] as string);
            columnNames.push(value);
        }
        const SQL = SQLqueries.createSQLinsert(tableName, columnNames, enteries);
        console.log(SQL);
        const response = await conn.query(SQL);
        conn.release();
        const result = response.rows[0];
        return result;
    } catch (error) {
        throw new Error(`Can't create entery: Model Level; ${tableName}: ${error}`);
    }
}
export async function showOne(tableName: string, filterColumn: string, filterValue: string, requestBody: exrpess.Request): Promise<Patient | Clinic> {
    try {
        const conn = await client.connect();
        let columnsNames: string[] = [];
        for (const value in requestBody) {
            if (value !== 'filterColumn' && value !== 'filterValue') {
                columnsNames.push(value);
            }
        }
        const SQL = SQLqueries.createSQLshowOneOnly(tableName, filterColumn, filterValue, columnsNames);
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
export async function showAll(tableName: string, requestBody: exrpess.Request, filter: boolean): Promise<Patient[] | Clinic[]> {
    try {
        const conn = await client.connect();
        let columnsName: string[] = [];
        let SQL: string = ''
        for (const value in requestBody.body) {
            if (value !== 'filterColumn' && value !== 'filterValue') {
                columnsName.push(value);
            }
        }
        console.log(columnsName)
        if (filter) {
            SQL = SQLqueries.createSQLshowAll(tableName, columnsName, [`${requestBody.body.filterColumn}`, `${requestBody.body.filterValue}`]);

        } else {
            SQL = SQLqueries.createSQLshowAll(tableName, columnsName);

        }
        console.log(SQL);
        console.log(SQL);
        const response = await conn.query(SQL);
        conn.release();
        const result = response.rows;
        return result;
    } catch (error) {
        throw new Error(`Can't showAll: Model Level: ${error}`);

    }
}
export async function update(tableName: string, req: exrpess.Request): Promise<Patient | Clinic> {
    try {
        let enteries: string[] = [];
        let columnNames: string[] = [];
        const requestBody = req.body;
        console.log(requestBody);
        for (const value in requestBody) {
            if (value !== 'filterColumn' && value !== 'filterValue') {

                enteries.push(requestBody[value as keyof typeof requestBody] as string);
                columnNames.push(value);
            }
        }
        const conn = await client.connect();
        const SQL = SQLqueries.createSQLupdate(tableName, columnNames, enteries, requestBody.filterColumn, requestBody.filterValue)
        console.log(SQL);
        const response = await conn.query(SQL);
        const result = response.rows[0];
        return result
    } catch (error) {
        throw new Error(`Can't update: Model Level: ${error}`);
    }

}
export async function deleteEntry(tableName: string, req: exrpess.Request): Promise<Patient | Clinic> {
    try {
        const conn = await client.connect();
        const SQL = SQLqueries.createSQLdelete(tableName, req.body.filterColumn, req.body.filterValue);
        console.log(SQL);
        const response = await conn.query(SQL);
        const result = response.rows[0];
        return result
    } catch (error) {
        throw new Error(`Can't delete: Model Level: ${error}`);

    }
}


