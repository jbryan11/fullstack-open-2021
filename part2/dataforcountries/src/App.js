import React, { useState, useEffect } from "react";
import Countries from "./components/Countries";
import axios from "axios";

const App = () => {
	const [countries, setCountries] = useState([]);
	const [searchValue, setSearchValue] = useState("");

	useEffect(() => {
		axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
			console.log("Data:", response.data);

			setCountries(response.data);
		});
	}, []);

	const handleSearchField = (event) => {
		setSearchValue(event.target.value);
	};
	const FilterCountries = !countries
		? countries
		: countries.filter((country) =>
				country.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
		  );

	return (
		<div>
			<div>
				Find <input onChange={handleSearchField} value={searchValue} />
			</div>
			{FilterCountries.length > 0 ? (
				<Countries list={FilterCountries} handler={handleSearchField}/>
			) : (
				<p>Country can't be found</p>
			)}
		</div>
	);
};

export default App;
