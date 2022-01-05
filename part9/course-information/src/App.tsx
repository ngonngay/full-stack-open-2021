import React from 'react';

// new types
interface CoursePartBase {
	name: string;
	exerciseCount: number;
	type: string;
}
interface CourseDescriptionPart extends CoursePartBase {
	description: string;
}
interface CourseNormalPart extends CourseDescriptionPart {
	type: 'normal';
}
interface CourseProjectPart extends CoursePartBase {
	type: 'groupProject';
	groupProjectCount: number;
}
interface CourseSpecial extends CourseDescriptionPart {
	type: 'special';
	requirements: string[];
}

interface CourseSubmissionPart extends CourseDescriptionPart {
	type: 'submission';
	exerciseSubmissionLink: string;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecial;

const Header = ({ courseName }: { courseName: string }) => {
	return (
		<div>
			<h1>{courseName}</h1>
		</div>
	);
};
const assertNever = (value: never): never => {
	throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
const Part = ({ part }: { part: CoursePart }) => {
	switch (part.type) {
		case 'normal':
			return (
				<>
					<h1>
						{part.name} {part.exerciseCount}
					</h1>
					<i>{part.description}</i>
				</>
			);
		case 'groupProject':
			return (
				<>
					<h1>
						{part.name} {part.exerciseCount}
					</h1>
					<p>{part.groupProjectCount}</p>
				</>
			);
		case 'submission':
			return (
				<>
					<h1>
						{part.name} {part.exerciseCount}
					</h1>
					<i>{part.description}</i>
					<p>submit to {part.exerciseSubmissionLink}</p>
				</>
			);
		case 'special':
			return (
				<>
					<h1>
						{part.name} {part.exerciseCount}
					</h1>
					<i>{part.description}</i>
					<p>required skills:{part.requirements}</p>
				</>
			);
		default:
			return assertNever(part);
	}
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
	return (
		<div>
			{courseParts.map((part: CoursePart) => (
				<Part part={part} key={part.name} />
			))}
		</div>
	);
};

const Total = ({ total }: { total: number }) => {
	return (
		<>
			<p>Number of exercises total {total}</p>
		</>
	);
};

const App = () => {
	const courseName = 'Half Stack application development';
	const courseParts: CoursePart[] = [
		{
			name: 'Fundamentals',
			exerciseCount: 10,
			description: 'This is the leisured course part',
			type: 'normal',
		},
		{
			name: 'Advanced',
			exerciseCount: 7,
			description: 'This is the harded course part',
			type: 'normal',
		},
		{
			name: 'Using props to pass data',
			exerciseCount: 7,
			groupProjectCount: 3,
			type: 'groupProject',
		},
		{
			name: 'Deeper type usage',
			exerciseCount: 14,
			description: 'Confusing description',
			exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
			type: 'submission',
		},
		{
			name: 'Backend development',
			exerciseCount: 21,
			description: 'Typing the backend',
			requirements: ['nodejs', 'jest'],
			type: 'special',
		},
	];

	return (
		<div>
			<Header courseName={courseName} />
			<Content courseParts={courseParts} />
			<Total
				total={courseParts.reduce((total, curr) => (total += curr.exerciseCount), 0)}
			/>
		</div>
	);
};

export default App;
