import {
	Entry,
	Gender,
	NewPatient,
	NewEntry,
	HealthCheckEntry,
	Diagnosis,
	Discharge,
	HealthCheckRating,
	BaseEntry,
} from '../types';
import { getDiagnoseDetail } from '../services/diagnoseService';
import { parse } from 'uuid';
type Fields = {
	name: unknown;
	dateOfBirth: unknown;
	ssn: unknown;
	gender: unknown;
	occupation: unknown;
	entries: unknown;
};

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};
const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};
const isGender = (gender: any): gender is Gender => {
	return Object.values(Gender).includes(gender);
};
const isHealthCheckRating = (healthCheck: any): healthCheck is HealthCheckRating => {
	return Object.values(HealthCheckRating).includes(healthCheck);
};
const isEntry = (entry: any): entry is Entry => {
	const HealthCheckEntry: boolean = entry.type === 'HealthCheck';
	const OccupationalHealthCareEntry: boolean = entry.type === 'OccupationalHealthcare';
	const HospitalEntry: boolean = entry.type === 'Hospital';
	return HealthCheckEntry || OccupationalHealthCareEntry || HospitalEntry;
};
const isDischarge = (discharge: any): discharge is Discharge => {
	if (!discharge.date || !isDate(discharge.date)) {
		throw new Error('Incorrect or missing date (discharge )');
	}
	if (!discharge.criteria || !isString(discharge.criteria)) {
		throw new Error('Incorrect or missing criteria (discharge )');
	}
	return discharge;
};
const parseName = (name: unknown): string => {
	if (!name || !isString(name)) {
		throw new Error('Incorrect or missing name');
	}
	return name;
};
const parseDateOfBirth = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date');
	}
	return date;
};
const parseSSN = (ssn: unknown): string => {
	if (!ssn || !isString(ssn)) {
		throw new Error('Incorrect or missing ssn');
	}
	return ssn;
};
const parseGender = (gender: unknown): Gender => {
	if (!gender || !isGender(gender)) {
		throw new Error('Incorrect or missing gender');
	}
	return gender;
};
const parseOccupation = (occupation: unknown): string => {
	if (!occupation || !isString(occupation)) {
		throw new Error('Incorrect or missing occupation');
	}
	return occupation;
};

const parseEntries = (entries: any): Entry[] => {
	if (!entries) {
		return entries;
	}

	if (!entries.map((e: any) => !isEntry(e))) {
		throw new Error('Incorrect or missing entry: ' + entries);
	}
	return entries;
};
const parseNewEntry = (entry: any): NewEntry => {
	if (!entry || !isEntry(entry)) {
		throw new Error('Incorrect or missing entry ');
	}
	return entry;
};

const parseEntryDescription = (description: string): string => {
	if (!description || !isString(description)) {
		throw new Error('Incorrect or missing description');
	}
	return description;
};
const parseEntryDate = (date: any): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error('Incorrect or missing date');
	}
	return date;
};
const parseEntrySpecialist = (specialist: any): string => {
	if (!specialist || !isString(specialist)) {
		throw new Error('Incorrect or missing specialist');
	}
	return specialist;
};
const parseEntryDiagnosticCodes = (diagnosisCodes: any): Array<Diagnosis['code']> => {
	if (!diagnosisCodes) {
		return diagnosisCodes;
	}
	if (!Array.isArray(diagnosisCodes)) {
		throw new Error('Invalid diagnostic code: ' + diagnosisCodes);
	}
	if (!diagnosisCodes.every((diagnosisCode: any) => isString(diagnosisCode))) {
		throw new Error('Invalid diagnostic code: ' + diagnosisCodes);
	} else {
		return diagnosisCodes;
	}
};
const parseDischarge = (discharge: any): Discharge => {
	if (!discharge || !isDischarge(discharge)) {
		throw new Error('Incorrect or missing discharge');
	}
	return discharge;
};
const parseEmployerName = (employerName: any): string => {
	if (!employerName || !isString(employerName)) {
		throw new Error('Incorrect or missing employerName');
	}
	return employerName;
};
const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
	if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
		throw new Error('Incorrect or missing healthCheckRating');
	}
	return healthCheckRating;
};
const assertNever = (value: never): never => {
	throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation, entries }: Fields): NewPatient => {
	const newPatient: NewPatient = {
		name: parseName(name),
		dateOfBirth: parseDateOfBirth(dateOfBirth),
		ssn: parseSSN(ssn),
		gender: parseGender(gender),
		occupation: parseOccupation(occupation),
		entries: parseEntries(entries),
	};
	newPatient.entries?.forEach((entry) => {
		//entry.diagnosisCodes?.map((diagnostic) => console.log(getDiagnoseDetail(diagnostic)));
		if (entry.diagnosisCodes) {
			entry.diagnosisCodes = entry.diagnosisCodes?.map(
				(diagnostic) => `${diagnostic} ${getDiagnoseDetail(diagnostic)?.name}`,
			);
		}
	});
	return newPatient;
};

const toNewEntries = (entries: Fields): NewEntry => {
	let validEntry: NewEntry = parseNewEntry(entries);

	if (!validEntry) {
		throw new Error('Invalid entries: ' + entries);
	}
	const newEntries: Omit<BaseEntry, 'id'> = {
		description: parseEntryDescription(validEntry.description),
		date: parseEntryDate(validEntry.date),
		specialist: parseEntrySpecialist(validEntry.specialist),
		diagnosisCodes: parseEntryDiagnosticCodes(validEntry.diagnosisCodes),
	};
	switch (validEntry.type) {
		case 'Hospital':
			return {
				...newEntries,
				type: validEntry.type,
				discharge: parseDischarge(validEntry.discharge),
			};
		case 'OccupationalHealthcare':
			return {
				...newEntries,
				type: validEntry.type,
				employerName: parseEmployerName(validEntry.employerName),
			};
		case 'HealthCheck':
			return {
				...newEntries,
				type: validEntry.type,
				healthCheckRating: parseHealthCheckRating(validEntry.healthCheckRating),
			};
		default:
			return assertNever(validEntry);
	}
};
export default { toNewPatient, toNewEntries };
