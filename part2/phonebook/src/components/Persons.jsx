const Persons = ({ list }) => {

	if (!list) return <p>Loading...</p>;

	return list.map((person) => (
		<p key={person.name}>
			{person.name} {person.number}
		</p>
	));
};
export default Persons;
