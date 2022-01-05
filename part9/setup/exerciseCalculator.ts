interface Result {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}
interface ExCalculator {
	dailyExercisHours: Array<number>;
	targetAmount: number;
}
const parseArgumentsEx = (args: Array<string>): ExCalculator => {
	if (args.length < 4) throw new Error('Not enough arguments');
	const [_pathBin, _pathFile, targetAmount, ...dailyExercisHoursArgs] = args;
	let result: ExCalculator = {
		targetAmount: -1,
		dailyExercisHours: [],
	};
	if (!isNaN(Number(targetAmount))) {
		result.targetAmount = Number(targetAmount);
	} else {
		throw new Error('Provided values (target amount of daily hours) were not numbers!');
	}
	const dailyExercisHours = dailyExercisHoursArgs.map((day) => Number(day));
	if (dailyExercisHours.some((hour) => typeof hour !== 'number')) {
		throw new Error('Provided values (daily exercise hours) were not numbers!');
	} else {
		result.dailyExercisHours = dailyExercisHours;
	}
	return result;
};
const calculateExercises = (dailyExercisHours: Array<number>, targetAmount: number): Result => {
	let result = {
		periodLength: 0,
		trainingDays: 0,
		success: false,
		rating: 0,
		ratingDescription: 'not have data yet',
		target: 0,
		average: 0,
	};
	result.periodLength = dailyExercisHours.length;
	result.trainingDays = dailyExercisHours.filter((day) => day !== 0).length;
	result.target = targetAmount;
	result.average = dailyExercisHours.reduce((acc, day) => (acc += day), 0) / dailyExercisHours.length;
	let rating = (result.average / targetAmount) * 100;
	if (rating <= 33.33) {
		result.rating = 1;
		result.ratingDescription = 'too bad';
	} else if (rating > 33.33 && rating <= 66.66) {
		result.rating = 2;
		result.ratingDescription = 'not too bad but could be better';
	} else {
		result.rating = 3;
		result.ratingDescription = 'excellent';
	}
	result.success = result.average >= targetAmount;

	return result;
};
try {
	const result = parseArgumentsEx(process.argv);
	if (result.targetAmount === -1 || result.dailyExercisHours === []) {
		throw new Error('Provided values was not a numbers!');
	}
	console.log(calculateExercises(result.dailyExercisHours, result.targetAmount));
} catch (error: unknown) {
	let errorMessage = 'Something bad happened.';
	if (error instanceof Error) {
		errorMessage += ' Error: ' + error.message;
	}
	console.log(errorMessage);
}
//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
export default calculateExercises;
