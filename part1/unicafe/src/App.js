import React, { useState } from "react";

const Statistics = (props) => {
	const { Good, Neutral, Bad } = props;
	const all = Good + Neutral + Bad;
	const average = (Good - Bad) / all;
	const positive = (Good / all) * 100;
	if (!all && !average && !positive) return <p>No feedback given.</p>;

	return (
		<div>
			<div>
				<table>
					<tbody>
					<StatisticsLine text="Good" value={Good} />
					<StatisticsLine text="Neutral" value={Neutral} />
					<StatisticsLine text="Bad" value={Bad} />
					<StatisticsLine text="All" value={all} />
					<StatisticsLine text="Average Score" value={average} />
					<StatisticsLine text="Positive Score" value={positive} isPercentage />
					</tbody>
				</table>
			</div>
		</div>
	);
};
const StatisticsLine = (props) => {
	const { text, value, isPercentage } = props;
	return (
		<React.Fragment>
			<tr>
				<td>{text}</td>
				<td>
					{value} {isPercentage ? "%" : ""}
				</td>
			</tr>
		</React.Fragment>
	);
};
const Button = (props) => {
	const { children, handler } = props;
	return (
		<React.Fragment>
			<button onClick={handler}>{children}</button>
		</React.Fragment>
	);
};
const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const addGood = () => setGood(good + 1);
	const addNeutral = () => setNeutral(neutral + 1);
	const addBad = () => setBad(bad + 1);

	return (
		<div>
			<h2>Give Feedback</h2>
			<Button handler={addGood}>Good</Button>
			<Button handler={addNeutral}>Neutral</Button>
			<Button handler={addBad}>Bad</Button>
			<h2>Statistics</h2>
			<Statistics Good={good} Neutral={neutral} Bad={bad} />
		</div>
	);
};

export default App;
