import React, { useState } from "react";

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
	const [newName, setNewName] = useState("");

	const handleInputName = (event) => {
		setNewName(event.target.value);
	};
	const addNewName = (event) => {
		event.preventDefault();
		const newNameObj = { name: newName };
		setPersons([newNameObj, ...persons]);
		setNewName("");
	};
	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addNewName}>
				<div>
					name: <input onChange={handleInputName} value={newName} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person) => (
				<p key={person.name}>{person.name}</p>
			))}
		</div>
	);
};

export default App;
