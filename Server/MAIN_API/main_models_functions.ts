// This module will be used to replace all models, instead we will pass the table name and request from the handler directly
import * as SQLqueries from '../helpers/createSQLString';
import client from "../database";
import exrpess from 'express';
import { Patient } from "../API/models/patients";
import { Clinic } from "../API/models/clinics";

export async function createNew(req: exrpess.Request): Promise<Patient | Clinic> {
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
export async function showOne(req: exrpess.Request): Promise<Patient | Clinic> {
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
export async function showAll(req: exrpess.Request, filter: boolean): Promise<Patient[] | Clinic[]> {
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
        const response = await conn.query(SQL);
        conn.release();
        const result = response.rows;
        return result;
    } catch (error) {
        throw new Error(`Can't showAll: Model Level: ${error}`);

    }
}
export async function update(req: exrpess.Request): Promise<Patient | Clinic> {
    try {
        let enteries: string[] = [];
        let columnNames: string[] = [];
        const requestBody = req.body.data.body;
        const filter = req.body.data.filter;
        for (const value in requestBody) {
            if (value !== 'filterColumn' && value !== 'filterValue') {
                enteries.push(requestBody[value as keyof typeof requestBody] as string);
                columnNames.push(value);
            }
        }
        const conn = await client.connect();
        const SQL = SQLqueries.createSQLupdate(req.params.tableName, columnNames, enteries, filter.column, filter.value)
        const response = await conn.query(SQL);
        conn.release();
        const result = response.rows[0];
        return result
    } catch (error) {
        throw new Error(`Can't update: Model Level: ${error}`);
    }

}
export async function deleteEntry(req: exrpess.Request): Promise<Patient | Clinic> {
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


