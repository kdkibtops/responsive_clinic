import client from "../../database";
import { checkClinicInDB } from "../../helpers/helper_functions";


export type Clinic = {
    id?: string,
    date: string, //yyyy-mm-dd
    attendingPhysician: number
}

export class clinic {
    async createNewClinic(date: string, physician: string): Promise<Clinic> {
        try {
            const conn = await client.connect();
            const SQL = `INSERT INTO clinics (date,attending_phys) VALUES ('${date}', '${physician}') RETURNING date, attending_phys;`;
            const response = await conn.query(SQL);
            conn.release();
            const result = response.rows[0];
            return result
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
    async deleteClinic(clinic_id: number): Promise<Clinic | string> {
        const clinic_present = await checkClinicInDB(clinic_id);
        if (clinic_present) {
            try {
                const conn = await client.connect();
                const SQL = `DELETE FROM clinics WHERE id = ${clinic_id} RETURNING *`;
                const response = await conn.query(SQL);
                conn.release();
                const result = response.rows[0];
                return result
            } catch (error) {
                throw new Error(`${error}`);
            }
        } else {
            return `Clinic is not found in database`
        }

    }
    async updateClinic(clinic_id: number, param: string, updateValue: string): Promise<Clinic | string> {
        const clinic_present = await checkClinicInDB(clinic_id);
        if (clinic_present) {
            try {
                const conn = await client.connect();
                const SQL = `UPDATE clinics SET ${param}='${updateValue}' WHERE id = '${clinic_id}' RETURNING *`;
                const response = await conn.query(SQL);
                conn.release();
                const result = response.rows[0];
                return result
            } catch (error) {
                throw new Error(`${error}`);
            }
        } else {
            return `Clinic is not found in database`
        }

    }
    async showClinic(clinic_id: number): Promise<clinic> {
        try {
            const conn = await client.connect();
            const SQL = `SELECT * FROM clinics WHERE id = ${clinic_id};`;
            const response = await conn.query(SQL);
            conn.release();
            const result = response.rows[0];
            return result;
        } catch (error) {
            throw new Error(`Can't show clinic: Model Level: ${error}`)
        }
    }
    async indexClinics(): Promise<Clinic[]> {
        try {
            const conn = await client.connect();
            const SQL = `SELECT * FROM clinics;`
            const response = await conn.query(SQL);
            conn.release();
            const result = response.rows;
            return result;
        } catch (error) {
            throw new Error(`Can't index all clinics: Model Level: ${error}`);
        }
    }
}



