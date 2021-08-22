const CountryProfile = ({ country }) => (
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
	</div>
);
export default CountryProfile