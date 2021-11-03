import React, { useState } from 'react';

const Button = ({ addFeedBack, text }) => {
	return <button onClick={addFeedBack}>{text} </button>;
};
const StatisticLine = ({ text, value }) => {
	return (
		<tr>
			<td>{text} </td>
			<td>{value}</td>
		</tr>
	);
};
const Statistics = ({ good, bad, neutral, all, average, positive }) => {
	if (all !== 0) {
		return (
			<table>
				<thead>
					<tr>
						<th>
							<h1>statistics</h1>
						</th>
					</tr>
					<tr>
						<th>Feedback</th>
						<th>Times</th>
					</tr>
				</thead>
				<tbody>
					<StatisticLine text='good' value={good} />
					<StatisticLine text='neutral' value={neutral} />
					<StatisticLine text='bad' value={bad} />
					<StatisticLine text='all' value={all} />
					<StatisticLine text='average' value={average} />
					<StatisticLine text='positive' value={positive} />
				</tbody>
			</table>
		);
	}
	return <tr>No feedback given</tr>;
};
const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const goodFeedback = () => {
		setGood(good + 1);
	};
	const neutralFeedback = () => {
		setNeutral(neutral + 1);
	};
	const badFeedback = () => {
		setBad(bad + 1);
	};
	let average = (good * 1 + bad * -1) / (good + bad + neutral);
	let positive = (good / (good + bad + neutral)) * 100;
	return (
		<div>
			<h1>Give Feedback</h1>
			<Button addFeedBack={goodFeedback} text={'good'} />
			<Button addFeedBack={neutralFeedback} text={'Neutral'} />
			<Button addFeedBack={badFeedback} text={'Bad'} />
			<Statistics
				good={good}
				neutral={neutral}
				bad={bad}
				all={good + bad + neutral}
				average={average ? average : 0}
				positive={positive ? ` ${positive} %` : `0%`}
			/>
		</div>
	);
};

export default App;
