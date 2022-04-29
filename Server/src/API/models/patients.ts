import client from "../../database";
import { checkPatientInDB } from "../../helpers/helper_functions";

export type Patient = {
    id?: string,
    firstName?: string,
    middleName?: string,
    lastName?: string,
    hospitalID?: string,
    nationalID?: string,
    mobile?: string,
    DOB?: string,
    residence?: string,
    gender?: string,
    rank?: string,
    firstVisit?: string,
    lastVisit?: string
}


export class patients {
    async createNewPatient(newPatient: Patient): Promise<Patient | null> {
        const patientPresent = await checkPatientInDB(newPatient.nationalID as string);
        if (patientPresent) {
            try {
                const conn = await client.connect();
                const SQL = `SELECT * FROM patients_personal WHERE nationalid = '${newPatient.nationalID}';`
                const response = await conn.query(SQL);
                const result = response.rows[0];
                console.log(`Patient already exits !`);

                return result
            } catch (error) {
                throw new Error(`${error}`);
            }

        } else if (!patientPresent) {
            try {
                const conn = await client.connect();
                const SQL = `INSERT INTO patients_personal (
                    firstname,middlename, lastname, hospitalid,nationalid, mobile,dob,residence,gender,rank,firstvisit,lastvisit) 
                    VALUES (
                         '${newPatient.firstName}',
                         '${newPatient.middleName}',
                         '${newPatient.lastName}',
                         '${newPatient.hospitalID}',
                         '${newPatient.nationalID}',
                         '${newPatient.mobile}',
                         '${newPatient.DOB}',
                         '${newPatient.residence}',
                         '${newPatient.gender}',
                         '${newPatient.rank}',
                         '${newPatient.firstVisit}',
                         '${newPatient.lastVisit}') 
                         RETURNING *;`
                const response = await conn.query(SQL);
                const result = response.rows[0];
                return result;
            } catch (error) {
                throw new Error(`${error}`);
            }
        } else {
            return null;
        }

    }
    async showPatient(field: string, value: string): Promise<Patient | null> {
        try {
            const conn = await client.connect();
            const SQL = `SELECT * FROM patients_personal WHERE ${field}='${value}';`
            const response = await conn.query(SQL);
            conn.release();
            const result = response.rows[0]
            if (result) {
                return result;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(`Can't showUser: model Level: ${error}`);
        }
    }
    async indexPatients(): Promise<Patient[] | null> {
        try {
            const conn = await client.connect();
            const SQL = `SELECT * FROM patients_personal;`
            const response = await conn.query(SQL);
            conn.release();
            const result = response.rows
            if (result) {
                return result;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(`Can't indexUser: model Level: ${error}`);
        }
    }
    async updatePatient(field: string, value: string, param: string, updateValue: string): Promise<Patient | null> {
        try {
            const conn = await client.connect();
            const SQL = `UPDATE patients_personal SET ${param}='${updateValue}' WHERE ${field}='${value}' RETURNING *;`
            const response = await conn.query(SQL);
            conn.release();
            const result = response.rows[0]
            if (result) {
                return result;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(`Can't updateUser: model Level: ${error}`);
        }
    }
    async deletePatient(field: string, value: string): Promise<Patient | null> {
        try {
            const conn = await client.connect();
            const SQL = `DELETE FROM patients_personal WHERE ${field}='${value}' RETURNING *;`
            const response = await conn.query(SQL);
            conn.release();
            const result = response.rows[0]
            if (result) {
                return result;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(`Can't showUser: model Level: ${error}`);
        }
    }
}