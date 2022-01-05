import React from 'react';
import { useParams } from 'react-router-dom';
import { setPatientDetail } from '../state';
import { useStateValue } from '../state';
import { apiBaseUrl } from '../constants';
import axios from 'axios';
import { Patient, Gender } from '../types';
import { Icon } from 'semantic-ui-react';
import { isEntry } from '../utils';
//import { nanoid } from 'nanoid';
import EntryDetails from './EntryDetails';
//import AddEntryForm from './AddEntryForm';
const PatientDetailPage = () => {
	const [{ patient }, dispatch] = useStateValue();
	const { id } = useParams<{ id: string }>();
	console.log(patient);
	// const onSubmit = () => {
	// 	console.log('submit');
	// };
	// const onCancel = () => {
	// 	console.log('cancle');
	// };
	React.useEffect(() => {
		const fetchPatientDetails = async () => {
			try {
				const patientDetailsFromApi = await axios
					.get<Patient>(`${apiBaseUrl}/patients/${id}`)
					.then((response) => response.data)
					.catch((err) => console.log(err));
				if (patientDetailsFromApi) {
					dispatch(setPatientDetail(patientDetailsFromApi));
				}
			} catch (e) {
				console.error(e);
			}
		};

		if (!patient || patient?.id !== id) {
			fetchPatientDetails();
		}
	}, [dispatch]);
	const displayGenderIcon = () => {
		if (patient?.gender === Gender.Male) {
			return <Icon name='mars' size='big' />;
		} else if (patient?.gender === Gender.Female) {
			return <Icon name='venus' size='big' />;
		} else {
			return <Icon name='genderless' size='big' />;
		}
	};
	const displayEntryType = (entry: any) => {
		//console.log(isEntry(entry));

		if (isEntry(entry)) {
			return <EntryDetails entry={entry} />;
		}
	};
	return (
		<div>
			<h1>
				{patient?.name} {displayGenderIcon()}
			</h1>
			<p>ssn : {patient?.ssn}</p>
			<p>occupation: {patient?.occupation}</p>
			<p>Entries :</p>
			{patient?.entries ? (
				patient?.entries.map((entry) => displayEntryType(entry))
			) : (
				<p>No entries...</p>
			)}
			<br />
			<br />
			{/* <AddEntryForm onSubmit={onSubmit} onCancel={onCancel} /> */}
		</div>
	);
};

export default PatientDetailPage;
