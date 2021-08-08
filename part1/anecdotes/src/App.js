import React, { useState } from "react";

function getRandomNumber(max) {
	return Math.floor(Math.random() * max);
}
function getHighestVote(pointsArr) {
	return Math.max(...pointsArr);
}

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients",
	];

	const [selected, setSelected] = useState(0);
	const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

	const nextAnecdote = () => {
		selected >= anecdotes.length - 1
			? setSelected(0)
			: setSelected(getRandomNumber(anecdotes.length - 1));
	};
	const addVote = () => {
		let copy = [...points];
		copy[selected] += 1;
		setPoints(copy);
	};
	const getMostVoted = () => {
    
		let highestVote = getHighestVote(points);

		return highestVote > 0
			? anecdotes[points.indexOf(highestVote)]
			: "No votes recorded.";
	};
	return (
		<div>
			{anecdotes[selected]}
			<br />
			<p>Anecdote has {points[selected] || "no vote(s)"}</p>
			<br />
			<button onClick={addVote}>Vote</button>
			<button onClick={nextAnecdote}>Next Anecdote</button>
			<h2>Anecdote with Most Votes</h2>
			<p>{getMostVoted()}</p>
			<p>It has {getHighestVote(points) || "no votes"}</p>
		</div>
	);
};

export default App;
