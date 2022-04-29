import * as SQLqueries from '../../helpers/createSQLString';
import client from "../../database";
import { Request, Response } from 'express';

export async function getClinicPatients(req: Request, res: Response) {
    try {
        const conn = await client.connect();
        const SQL = ` `
        const response = await conn.query(SQL);
        const result = response.rows;
        return result;
    } catch (error) {
        throw new Error(`Can't getClinicPatients: Hanlder Level: ${error}`);
    }
}

export async function getPatientVisits(req: Request, res: Response, lastVisitOnly?: boolean) {
    try {
        const conn = await client.connect();
        const SQL = ` `
        const response = await conn.query(SQL);
        const result = response.rows;
        return result;
    } catch (error) {
        throw new Error(`Can't getPatientVisits: Hanlder Level: ${error}`);
    }
}

export async function getClinicLastLabs(req: Request, res: Response, lab?: string) {
    try {
        const conn = await client.connect();
        const SQL = ` `
        const response = await conn.query(SQL);
        const result = response.rows;
        return result;
    } catch (error) {
        throw new Error(`Can't getClinicLastLabs: Hanlder Level: ${error}`);
    }
}

export async function getClinicLastImaging(req: Request, res: Response, modality?: string) {
    try {
        const conn = await client.connect();
        const SQL = ` `
        const response = await conn.query(SQL);
        const result = response.rows;
        return result;
    } catch (error) {
        throw new Error(`Can't getClinicLastImaging: Hanlder Level: ${error}`);
    }
}

export async function filterPatientsBy(req: Request, res: Response, filterColumn: string, filterValue: string, sort?: string) {
    try {
        const conn = await client.connect();
        const SQL = ` `
        const response = await conn.query(SQL);
        const result = response.rows;
        return result;
    } catch (error) {
        throw new Error(`Can't filterPatientsBy${filterColumn}: Hanlder Level: ${error}`);
    }
}

export async function enterCustomSQL(req: Request, res: Response) {
    try {
        const conn = await client.connect();
        const SQL = req.body.SQL;
        const response = await conn.query(SQL);
        const result = response.rows;
        return result;
    } catch (error) {
        throw new Error(`Can't enterCustomSQL: Hanlder Level: ${error}`);
    }
}
