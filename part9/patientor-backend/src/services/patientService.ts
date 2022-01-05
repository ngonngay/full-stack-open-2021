import { patients } from '../data/patients';
import { Patient, NoneSensitivePatient, NewPatient } from '../types';
import { v4 as uuid } from 'uuid';
import patient from '../routes/patient';

const getPatients = (): Patient[] => {
	return patients;
};
const getNoneSensitivePatients = (): NoneSensitivePatient[] => {
	return patients;
};
const addPatient = (patient: NewPatient): Patient => {
	const newPatient = {
		...patient,
		id: uuid(),
	};
	patients.push(newPatient);
	return newPatient;
};
const getPatientById = (id: string) => {
	return patients.find((p) => p.id === id);
};
export { getPatients, getNoneSensitivePatients, addPatient, getPatientById };
