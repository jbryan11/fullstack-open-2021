const SomeCountries = ({ countries,showHandler }) => {
	return (
		<>
			{countries.map((country) => (
				<div key={country.name}>
					<p>{country.name}</p>
					<button onClick={showHandler} key={country.name} value={country.name}>Show</button>
				</div>
			))}
		</>
	);
};
export default SomeCountries