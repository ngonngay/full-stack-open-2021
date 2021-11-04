import React from 'react';
const Header = (props) => {
	return (
		<div>
			<h1>{props.course}</h1>
		</div>
	);
};
const Part = ({ content }) => {
	return (
		<>
			<p>
				{content.name} {content.exercises}
			</p>
		</>
	);
};
const Content = (props) => {
	return (
		<div>
			{props.content.map((content) => (
				<Part content={content} key={content.name} />
			))}
		</div>
	);
};

const Total = ({ total }) => {
	return (
		<>
			<p>Number of exercises total {total}</p>
		</>
	);
};
const App = () => {
	const course = 'Half Stack application development';
	const parts = [
		{
			name: 'Fundamentals of React',
			exercises: 10,
		},
		{
			name: 'Using props to pass data',
			exercises: 7,
		},
		{
			name: 'State of a component',
			exercises: 14,
		},
	];
	return (
		<div>
			<Header course={course} />
			<Content content={parts} />
			<Total
				total={parts.reduce((total, curr) => (total += curr.exercises), 0)}
			/>
		</div>
	);
};

export default App;
