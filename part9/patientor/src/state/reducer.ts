import { State } from './state';
import { Patient } from '../types';

export type Action =
	| {
			type: 'SET_PATIENT_LIST';
			payload: Patient[];
	  }
	| {
			type: 'ADD_PATIENT';
			payload: Patient;
	  }
	| {
			type: 'SET_PATIENT_DETAIL';
			payload: Patient;
	  };

export const setPatientDetail = (patient: Patient): Action => {
	return {
		type: 'SET_PATIENT_DETAIL',
		payload: patient,
	};
};
export const setPatientList = (patients: Patient[]): Action => {
	return {
		type: 'SET_PATIENT_LIST',
		payload: patients,
	};
};
export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'SET_PATIENT_LIST':
			return {
				...state,
				patients: {
					...action.payload.reduce(
						(memo, patient) => ({ ...memo, [patient.id]: patient }),
						{},
					),
					...state.patients,
				},
			};
		case 'ADD_PATIENT':
			return {
				...state,
				patients: {
					...state.patients,
					[action.payload.id]: action.payload,
				},
			};
		case 'SET_PATIENT_DETAIL':
			return {
				...state,
				patient: action.payload,
			};
		default:
			return state;
	}
};
