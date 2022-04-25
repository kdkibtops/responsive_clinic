import { Clinic, clinic } from "../models/clinics";
import express from "express";
import { authenticateUser, getDataFromToken, passwordHashing, verifyToken, verifyUser } from "../service/authentication";


const _clinic_ = new clinic();
const clinics_routes = express.Router();

async function createNewClinic(req: express.Request, res: express.Response): Promise<void> {
    try {
        const clinic = await _clinic_.createNewClinic(req.body.date, req.body.physician);
        res.status(200);
        res.json(clinic);

    } catch (error) {
        throw new Error(`!Error at handler level!, Can't create clinic: ${error}`);
    }
}
async function deleteClinic(req: express.Request, res: express.Response): Promise<void> {
    try {
        const clinic = await _clinic_.deleteClinic(req.body.clinic_id);
        res.status(200);
        res.json(clinic);
    } catch (error) {
        throw new Error(`!Error at handler level!, Can't delete clinic: ${error}`);
    }
}
async function updateClinic(req: express.Request, res: express.Response): Promise<void> {
    try {
        const clinic = await _clinic_.updateClinic(req.body.clinic_id, req.body.param, req.body.update_value);
        res.status(200);
        res.json(clinic);
    } catch (error) {
        throw new Error(`!Error at handler level!, Can't update clinic: ${error}`);
    }
}
async function showClinic(req: express.Request, res: express.Response): Promise<void> {
    try {
        const clinic = await _clinic_.showClinic(req.body.clinic_id);
        res.status(200);
        res.json(clinic);
    } catch (error) {
        throw new Error(`!Error at handler level!, Can't show clinic: ${error}`);
    }
}
async function indexClinics(req: express.Request, res: express.Response): Promise<void> {

    try {
        const clinics = await _clinic_.indexClinics();
        res.status(200);
        res.json(clinics);
    } catch (error) {
        throw new Error(`Can't index clinics: Handler Level: ${error}`);
    }
}

clinics_routes.post('/create', createNewClinic);
clinics_routes.delete('/delete', deleteClinic);
clinics_routes.put('/update', updateClinic);
clinics_routes.get('/showClinic', showClinic);
clinics_routes.get('/indexClinics', indexClinics);

export default clinics_routes;