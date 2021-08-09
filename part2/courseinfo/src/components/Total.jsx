const Total = ({ course }) => {
	let initValue = 0;
	const sum = course.parts.reduce(
		(prev, current) => prev + current.exercises,
		initValue
	);
	return (
		<p>
			<strong>Number of exercises {sum}</strong>
		</p>
	);
};

export default Total;
