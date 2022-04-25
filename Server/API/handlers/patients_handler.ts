import express from 'express';
import { Patient, patients } from '../models/patients';

const patients_routes = express.Router();
const _patient_ = new patients();

async function registerNewPatient(req: express.Request, res: express.Response): Promise<void> {
    try {
        const newPatient: Patient = {
            firstName: req.body.firstName,
            middleName: req.body.middleName,
            lastName: req.body.lastName,
            hospitalID: req.body.hospitalID,
            nationalID: req.body.nationalID,
            mobile: req.body.mobile,
            DOB: req.body.DOB,
            residence: req.body.residence,
            gender: req.body.gender,
            rank: req.body.rank,
            firstVisit: req.body.firstVisit,
            lastVisit: req.body.lastVisit
        }
        const patient = await _patient_.createNewPatient(newPatient);
        res.status(200);
        res.json(patient);
    } catch (error) {
        throw new Error(`Can not register new patient: Handler Level: ${error}`);
    }

}
async function showPatient(req: express.Request, res: express.Response): Promise<void> {
    try {
        const patient = await _patient_.showPatient(req.body.field, req.body.value);
        if (patient) {
            res.status(200);
            res.json(patient);
        } else {
            res.json(`Patient not found`);
        }
    } catch (err) {
        throw new Error(`Can not showPatient: Handler Level: ${err}`);
    }
}
async function indexPatients(req: express.Request, res: express.Response): Promise<void> {
    try {
        const patients = await _patient_.indexPatients();
        if (patients) {
            res.status(200);
            res.json(patients);
        } else {
            res.json(`Patients not found`);
        }
    } catch (err) {
        throw new Error(`Can not indexPatients: Handler Level: ${err}`);
    }
}
async function updatePatient(req: express.Request, res: express.Response): Promise<void> {
    try {
        req.params
        const patient = await _patient_.updatePatient(req.body.field, req.body.value, req.body.updateField, req.body.updateValue);
        if (patient) {
            res.status(200);
            res.json(patient);
        } else {
            res.json(`Patient not found`);
        }
    } catch (err) {
        throw new Error(`Can not showPatient: Handler Level: ${err}`);
    }
}
async function deletePatient(req: express.Request, res: express.Response): Promise<void> {
    try {
        const patient = await _patient_.deletePatient(req.body.field, req.body.value);
        if (patient) {
            res.status(200);
            res.json(patient);
        } else {
            res.json(`Patient not found`);
        }
    } catch (err) {
        throw new Error(`Can not showPatient: Handler Level: ${err}`);
    }
}




patients_routes.post('/registerpatient', registerNewPatient)
patients_routes.get('/showpatient', showPatient);
patients_routes.get('/indexpatients', indexPatients);
patients_routes.put('/updatepatient', updatePatient);
patients_routes.delete('/deletepatient', deletePatient);


export default patients_routes