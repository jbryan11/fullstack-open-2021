import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import InputForm from "./components/InputForm";
import Input from "./components/Input";
import Persons from "./components/Persons";
import phonebook from "./api/phonebook";
import Notifications from "./components/Notifications";
const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filterInput, setFilterInput] = useState("");
	const [notificationMessage, setNotificationMessage] = useState(null);
	const [isError, setIsError] = useState(false);

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
	function notifyUser(isErr, message) {
		setIsError(isErr);
		setNotificationMessage(message);
		setTimeout(() => {
			setNotificationMessage(null);
		}, 5000);
	}
	function getPersons() {
		phonebook.getAll().then((data) => setPersons(data));
	}
	const deletePerson = (event) => {
		let confirmation = window.confirm(
			"Do you want to delete this person from the phonebook?"
		);
		if (confirmation) {
			phonebook
				.deletePerson(event.target.value)
				.then((status) => {
					if (status === 200) getPersons();
					
				})
				.catch((error) => {
					console.error(error);
					notifyUser(1, "This person has already been deleted from the server.");
				});
		}
	};
	const updatePerson = (currentId, newest) => {
		const needUpdate = window.confirm(
			`The person, ${newName} is already added to phonebook, replace old number with a new one?`
		);
		if (needUpdate) {
			phonebook
				.updatePerson(currentId, newest)
				.then((status) => {
					if (status === 200) getPersons();
					resetField();
				})
				.catch((error) => {
					console.error(error);
					notifyUser(true, `The person was not updated. Please try again.`);
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
			notifyUser(false, `${newName} has been added to phonebook`);
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
			<Notifications isError={isError} message={notificationMessage} />
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
