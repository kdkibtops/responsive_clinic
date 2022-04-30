import * as SQLqueries from '../../helpers/createSQLString';
import client from "../../database";
import { Request, Response } from 'express';
import { CLIINC_PATIENT } from '../../config/clinicTypes';

export async function getClinicPatients(req: Request, res: Response) {
    try {
        const conn = await client.connect();
        const SQL = `SELECT * FROM patients_personal 
        JOIN patients_visits ON patients_personal.pat_nat_id = patients_visits.pat_nat_id
        JOIN clinics on CAST(patients_visits.clinic_id as INTEGER)= clinics.id
        WHERE clinics.id = ${req.params.clinicID};`;
        const response = await conn.query(SQL);
        const result = response.rows;
        let results: CLIINC_PATIENT[] = [];
        for (let i = 0; i < result.length; i++) {
            const dataToAdd = result[i]
            const pat_fullname = dataToAdd.firstname + ' ' + dataToAdd.middlename + ' ' + dataToAdd.lastname;
            let mobiles = ['NA'], furthers = ['NA'], dobDiff = 0, _age = 0
            if (dataToAdd.mobile) {
                mobiles = dataToAdd.mobile.split(";");
            };
            if (dataToAdd.further) {
                furthers = dataToAdd.further.split(';');
            }
            if (dataToAdd.dob) {
                dobDiff = Math.abs(Date.now() - Date.parse(dataToAdd.dob));
                _age = Math.floor((dobDiff / (1000 * 3600 * 24)) / 365);
            }
            const retrPatient: CLIINC_PATIENT = {
                basic: {
                    fullname: pat_fullname || 'NA',
                    hospital_id: dataToAdd.hospital_id || 'NA',
                    pat_nat_id: dataToAdd.pat_nat_id || 'NA',
                    mobile: mobiles || ['NA'],
                    dob: dataToAdd.dob || 'NA',
                    age: _age || 0,
                    residence: dataToAdd.residence || 'NA',
                    gender: dataToAdd.gender || 'NA',
                    rank: dataToAdd.rank || 'NA',
                    firstvisit: dataToAdd.firstvisit || 'NA',
                    lastvisit: dataToAdd.lastvisit || 'NA',
                    decision: dataToAdd.decision || 'NA',
                    futher: furthers || ['NA'],
                    remarks: dataToAdd.remarks || 'NA',
                    radiologist: dataToAdd.radiologist || 'NA'
                },
                cbc: {},
                chemistry: {},
                clinics: {},
                clinical_data: {},
                ct: {},
                resection: {},
                rfa: {},
                tace: {},
                tumor_markers: {},
                ultrasound: {},
                patient_plan: {},
                patient_visits: {},
                virology: {},
                mri: {}
            }
            results.push(retrPatient);
        }

        return results;
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
