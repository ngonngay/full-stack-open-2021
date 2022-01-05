import { Entry } from './types';
export const isEntry = (entry: any): entry is Entry => {
	const HealthCheckEntry: boolean = entry.type === 'HealthCheck';
	const OccupationalHealthCareEntry: boolean = entry.type === 'OccupationalHealthcare';
	const HospitalEntry: boolean = entry.type === 'Hospital';
	return HealthCheckEntry || OccupationalHealthCareEntry || HospitalEntry;
};
