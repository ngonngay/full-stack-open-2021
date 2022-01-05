interface MultiplyValues {
	weight: number;
	height: number;
}
const parseArguments = (args: Array<string>): MultiplyValues => {
	if (args.length < 4) throw new Error('Not enough arguments');
	if (args.length > 4) throw new Error('Too many arguments');
	console.log(args);

	if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
		return {
			weight: Number(args[2]),
			height: Number(args[3]),
		};
	} else {
		throw new Error('Provided values were not numbers!');
	}
};

const calculateBmi = (height: number, weight: number): string => {
	const bmi = weight / ((height / 100) * (height / 100));
	if (bmi < 16.0) {
		return 'Underweight (Severe thinness)';
	} else if (bmi >= 16.0 && bmi <= 16.9) {
		return 'Underweight (Moderate thinness)';
	} else if (bmi >= 17.0 && bmi <= 18.4) {
		return 'Underweight (Mild thinness)';
	} else if (bmi >= 18.5 && bmi <= 24.9) {
		return 'Normal (healthy weight)';
	} else if (bmi >= 25.0 && bmi <= 29.9) {
		return 'Overweight (Pre-obese)';
	} else if (bmi >= 30.0 && bmi <= 34.9) {
		return 'Obese (Class I)';
	} else if (bmi >= 35.0 && bmi <= 39.9) {
		return 'Obese (Class II)';
	} else {
		console.log(bmi);

		return 'Obese (Class III)';
	}
};

try {
	const { weight, height } = parseArguments(process.argv);
	//console.log(weight, height);
	console.log(calculateBmi(weight, height));
} catch (error: unknown) {
	let errorMessage = 'Something bad happened.';
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}
//console.log(calculateBmi(180, 74));
//console.log(calculateBmi(170, 66));
export default calculateBmi;
