const Persons = ({ list, deleteHandler }) => {

	if (!list) return <p>Please wait...</p>;

	return list.map((person) => (
		
		<p key={person.name}>
			{person.name} {person.number}
		 <button onClick={deleteHandler} value={person.id}>Delete</button>
		</p>
		
	));
};
export default Persons;
