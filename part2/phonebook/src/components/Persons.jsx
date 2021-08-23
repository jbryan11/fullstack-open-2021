const Persons = ({ list, deleteHandler }) => {

	if (list.length === 0) return <p>There are no person added to the phonebook.</p>;

	return list.map((person) => (
		
		<p key={person.name}>
			{person.name} {person.number}
		 <button onClick={deleteHandler} value={person.id}>Delete</button>
		</p>
		
	));
};
export default Persons;
