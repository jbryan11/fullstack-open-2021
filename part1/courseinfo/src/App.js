import React from "react";

const App = () => {
	const course = "Half Stack application development";
	const part1 = {
		name: "Fundamentals of React",
		exercises: 10,
	};
	const part2 = {
		name: "Using props to pass data",
		exercises: 7,
	};
	const part3 = {
		name: "State of a component",
		exercises: 14,
	};

	const Header = (props) => {
		return <h1>{props.course}</h1>;
	};
	const Content = () => (
		<>
			<Part name={part1} number={part1.exercises1} />
			<Part name={part2} number={part2.exercises2} />
			<Part name={part3} number={part3.exercises3} />
		</>
	);
	const Part = ({ name, number }) => (
		<p>
			{name} {number}
		</p>
	);
	const Total = () => (
		<p>
			Number of exercises{" "}
			{part1.exercises1 + part2.exercises2 + part3.exercises3}
		</p>
	);
	return (
		<div>
			<Header course={course} />
			<Content />
			<Total />
		</div>
	);
};

export default App;
