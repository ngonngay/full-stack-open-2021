import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();
app.use(express.json());
app.get('/ping', (_req, res) => {
	res.send('pong');
});
app.get('/hello', (_req, res) => {
	res.send('hello');
});
app.get('/bmi', (req, res) => {
	const { weight, height } = req.query;
	console.log(req.query);
	const result = calculateBmi(Number(height), Number(weight));
	res.send(result);
});
app.post('/calculator', (req, res) => {
	const { daily_exercises, target } = req.body;
	const result = calculateExercises(daily_exercises, target);

	res.send(result);
});
app.get('/', (_req, res) => {
	res.send('..i..');
});

const PORT = 3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
