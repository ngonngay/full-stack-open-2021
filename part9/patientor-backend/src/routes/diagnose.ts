import express from 'express';
import { getDiagnose } from '../services/diagnoseService';
const diagnoseRoute = express.Router();

diagnoseRoute.get('/', (_req, res) => {
	const diagnoses = getDiagnose();
	res.send(diagnoses);
});

diagnoseRoute.post('/', (_req, res) => {
	res.send('Saving a diagnose!');
});

export default diagnoseRoute;
