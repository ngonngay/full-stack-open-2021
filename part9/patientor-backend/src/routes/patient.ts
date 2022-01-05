import express from 'express';
import { getPatients, addPatient, getPatientById } from '../services/patientService';
import { Utils } from '../utils';

const patientRoute = express.Router();

patientRoute.post('/:id/entries', (req, res) => {
	const patient = getPatientById(req.params.id);
	if (!patient) {
		return res.status(404).send(`No patient with id ${req.params.id} was found`);
	}
	const newEntries = Utils.toNewEntries(req.body);
	return res.send(newEntries);
});
patientRoute.get('/:id', (req, res) => {
	const patient = getPatientById(req.params.id);
	res.send(patient);
});
patientRoute.get('/', (_req, res) => {
	const patients = getPatients();
	res.send(patients);
});
patientRoute.post('/', (req, res) => {
	try {
		const newPatients = Utils.toNewPatient(req.body);
		addPatient(newPatients);
		res.send(newPatients);
	} catch (error: any) {
		res.status(400).send(error.message);
	}
});

export default patientRoute;
