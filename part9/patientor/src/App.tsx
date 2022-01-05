import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Button, Divider, Header, Container } from 'semantic-ui-react';

import { apiBaseUrl } from './constants';
import { useStateValue } from './state';
import { Patient } from './types';

import { setPatientList } from './state';

import PatientListPage from './PatientListPage';
import PatientDetailPage from './PatientDetailPage';

const App = () => {
	const [, dispatch] = useStateValue();
	React.useEffect(() => {
		void axios.get<void>(`${apiBaseUrl}/ping`);

		const fetchPatientList = async () => {
			try {
				const { data: patientListFromApi } = await axios.get<Patient[]>(
					`${apiBaseUrl}/patients`,
				);
				dispatch(setPatientList(patientListFromApi));
			} catch (e) {
				console.error(e);
			}
		};
		void fetchPatientList();
	}, [dispatch]);

	return (
		<div className='App'>
			<Router>
				<Container>
					<Header as='h1'>Patientor</Header>
					<Button as={Link} to='/' primary>
						Home
					</Button>
					<Divider hidden />
					<Switch>
						<Route path='/patient/:id'>
							<PatientDetailPage />
						</Route>
						<Route path='/'>
							<PatientListPage />
						</Route>
					</Switch>
				</Container>
			</Router>
		</div>
	);
};

export default App;
