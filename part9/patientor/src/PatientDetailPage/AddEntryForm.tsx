import React from 'react';
import { BaseEntry, Type, HealthCheckRating } from '../types';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import { TextField, SelectField, TypeOption, HealthCheckRatingOption } from '../AddPatientModal/FormField';
export type EntryFormValues = Omit<BaseEntry, 'id' | 'entries'>;
interface Props {
	onSubmit: (values: EntryFormValues) => void;
	onCancel: () => void;
}
const typeOptions: TypeOption[] = [
	{ value: Type.HealthCheck, label: 'HealthCheck' },
	{ value: Type.Hospital, label: 'Hospital' },
	{ value: Type.OccupationalHealthcare, label: 'OccupationalHealthcare' },
];
const healthCheckRatingOptions: HealthCheckRatingOption[] = [
	{ value: HealthCheckRating.Healthy, label: 'HealthCheck' },
	{ value: HealthCheckRating.LowRisk, label: 'Hospital' },
	{ value: HealthCheckRating.HighRisk, label: 'OccupationalHealthcare' },
	{ value: HealthCheckRating.CriticalRisk, label: 'CriticalRisk' },
];
const AddEntryForm = ({ onSubmit }: Props) => {
	return (
		<Formik
			initialValues={{
				description: '',
				date: '',
				specialist: '',
			}}
			onSubmit={onSubmit}
			validate={(values) => {
				const requiredError = 'Field is required';
				const errors: { [field: string]: string } = {};
				if (!values.date) {
					errors.name = requiredError;
				}
				if (!values.specialist) {
					errors.ssn = requiredError;
				}
				if (!values.description) {
					errors.dateOfBirth = requiredError;
				}

				return errors;
			}}>
			{({ isValid }) => {
				return (
					<Form className='form ui'>
						<Field
							label='Date'
							placeholder='YYYY-MM-DD'
							name='date'
							component={TextField}
						/>
						<Field
							label='Specialist'
							name='specialist'
							component={TextField}
						/>
						<Field
							label='Description'
							name='description'
							component={TextField}
						/>
						{/* <SelectField label='Type' name='type' options={typeOptions} />
						<SelectField
							label='Healthy Rating'
							name='healthCheckRating'
							options={healthCheckRatingOptions}
						/> */}
						<Grid>
							<Grid.Column floated='right' width={5}>
								<Button
									type='submit'
									floated='right'
									color='green'
									disabled={!isValid}>
									Add
								</Button>
							</Grid.Column>
						</Grid>
					</Form>
				);
			}}
		</Formik>
	);
};

export default AddEntryForm;
