import React from 'react';
const Header = ({ course }) => {
	return <h1>{course}</h1>;
};

const Total = ({ total }) => {
	return (
		<>
			<p>Total of {total} exercises</p>
		</>
	);
};

const Part = ({ part }) => {
	console.log(part);
	return (
		<p>
			{part.name} {part.exercises}
		</p>
	);
};

const Content = ({ content }) => {
	console.log(content);
	return (
		<div>
			{content.map((course) => (
				<Part part={course} key={course.id} />
			))}
		</div>
	);
};

const Course = ({ course }) => {
	return (
		<div>
			<Header course={course.name} />
			<Content content={course.parts} />
			<Total
				total={course.parts.reduce(
					(total, curr) => (total += curr.exercises),
					0,
				)}
			/>
		</div>
	);
};
export default Course;
