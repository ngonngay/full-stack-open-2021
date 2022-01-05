export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}
export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}
export interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<Diagnosis['code']>;
}
export enum HealthCheckRating {
	'Healthy' = 0,
	'LowRisk' = 1,
	'HighRisk' = 2,
	'CriticalRisk' = 3,
}
export type Discharge = {
	date: string;
	criteria: string;
};
export interface HealthCheckEntry extends BaseEntry {
	type: 'HealthCheck';
	healthCheckRating: HealthCheckRating;
}
export interface OccupationalHealthCareEntry extends BaseEntry {
	type: 'OccupationalHealthcare';
	employerName: string;
}
export interface HospitalEntry extends BaseEntry {
	type: 'Hospital';
	discharge: Discharge;
}
export type Entry = HospitalEntry | OccupationalHealthCareEntry | HealthCheckEntry;

export interface Patient {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
	entries: Entry[];
}
export type NoneSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

export type NewEntry =
	| Omit<HospitalEntry, 'id'>
	| Omit<OccupationalHealthCareEntry, 'id'>
	| Omit<HealthCheckEntry, 'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
