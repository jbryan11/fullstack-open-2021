import React from "react";

const App = () => {
	const course = "Half Stack application development";
	const part1 = "Fundamentals of React";
	const exercises1 = 10;
	const part2 = "Using props to pass data";
	const exercises2 = 7;
	const part3 = "State of a component";
	const exercises3 = 14;

	const Header = (props) => {
    console.log(props)
    return<h1>{props.course}</h1>};
	const Content = () => (
		<>
			<Part name={part1} number={exercises1} />
			<Part name={part2} number={exercises2} />
			<Part name={part3} number={exercises3} />
		</>
	);
	const Part = ({ name, number }) => (
		<p>
			{name} {number}
		</p>
	);
	const Total = () => (
		<p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
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
