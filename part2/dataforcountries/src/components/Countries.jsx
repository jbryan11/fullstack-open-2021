import CountryProfile from "./ContryProfile";
import SomeCountries from "./SomeCountries";

const Countries = ({ list, handler }) => {
	if (list.length > 10) {
		return (
			<div>
				<p>Too many matches, specify another filter</p>
			</div>
		);
	}
	if (list.length === 1) {
		return <CountryProfile country={list[0]} />;
	}
	return (
		<div>
			<SomeCountries countries={list} showHandler={handler} />
		</div>
	);
};
export default Countries;
