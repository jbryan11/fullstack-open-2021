const Total = ({ parts }) => {
	let initValue = 0;
	const sum = parts.reduce(
		(prev, current) => prev + current.exercises,
		initValue
	);
	return (
		<h4>
			<strong>Number of exercises {sum}</strong>
		</h4>
	);
};

export default Total;
