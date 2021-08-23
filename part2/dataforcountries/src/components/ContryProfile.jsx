import WeatherForecast from "./WeatherForecast";
const CountryProfile = ({ country }) => {
	
	return (
		<div>
			<h2>{country.name}</h2>
			<br />
			<p>
				Capital: <b>{country.capital}</b>
			</p>
			<p>
				Population: <b>{country.population}</b>
			</p>
			<br />
			<h4>Languages:</h4>
			<ul>
				{country.languages.map((language) => (
					<li key={language.iso639_1}>
						<b>{language.name}</b>
					</li>
				))}
			</ul>
			<img src={country.flag} alt="flag" />
			<h4>Weather in {country.capital}</h4>
			<WeatherForecast capital={country.capital}/>
		</div>
	);
};
export default CountryProfile;
