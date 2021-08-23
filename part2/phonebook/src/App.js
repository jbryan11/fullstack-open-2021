import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import InputForm from "./components/InputForm";
import Input from "./components/Input";
import Persons from "./components/Persons";
import phonebook from "./api/phonebook";
const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filterInput, setFilterInput] = useState("");

	useEffect(() => {
		phonebook.getAll().then((data) => setPersons(data));
	}, []);
	const handleInputName = (event) => {
		setNewName(event.target.value);
	};
	const handleInputNumber = (event) => {
		setNewNumber(event.target.value);
	};
	const handleFilterInput = (event) => {
		setFilterInput(event.target.value);
	};

	function resetField() {
		setNewName("");
		setNewNumber("");
	}
	const deletePerson = (event) => {
		let confirmation = window.confirm(
			"Do you want to delete this person from the phonebook?"
		);
		if (confirmation) {
			phonebook.deletePerson(event.target.value).then((status) => {
				status === 200
					? phonebook.getAll().then((data) => setPersons(data))
					: alert(
							`$Person with id ${event.target.value} has not been deleted due to error`
					  );
			});
		}
	};
	const updatePerson = (currentId, newest) => {
		const needUpdate = window.confirm(
			`The person, ${newName} is already added to phonebook, replace old number with a new one?`
		);
		if (needUpdate) {
			phonebook.updatePerson(currentId, newest).then((status) => {
				status === 200
					? phonebook.getAll().then((data) => {
							setPersons(data);
							resetField()
					  })
					: alert(`The person was not updated. Please try again.`);
			});
		}
	};
	const checkPerson = () => {
		return persons.find(
			(person) => person.name.toLowerCase() === newName.toLowerCase()
		);
	};
	const addPerson = (person) => {
		phonebook.addPerson(person).then((data) => {
			setPersons(persons.concat(data));
			alert(`${newName} has already been added to phonebook`);
			resetField();
		});
	};
	const addNewName = (event) => {
		event.preventDefault();
		const personFound = checkPerson();
		const newPerson = {
			name: newName,
			number: newNumber,
		};

		personFound
			? updatePerson(personFound.id, newPerson)
			: addPerson(newPerson);
	};
	const fitlerResult = !filterInput
		? persons
		: persons.filter((person) =>
				person.name.toLowerCase().includes(filterInput.toLocaleLowerCase())
		  );

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter handler={handleFilterInput} value={filterInput} />
			<h2>Add new Phone</h2>
			<InputForm formHandler={addNewName}>
				<Input handler={handleInputName} value={newName}>
					Name
				</Input>
				<Input handler={handleInputNumber} value={newNumber}>
					Phone
				</Input>
			</InputForm>
			<h2>Numbers</h2>
			<Persons list={fitlerResult} deleteHandler={deletePerson} />
		</div>
	);
};

export default App;
