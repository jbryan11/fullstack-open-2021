import React, { useEffect, useState } from "react";
import Filter from "./components/Filter";
import InputForm from "./components/InputForm";
import Input from "./components/Input";
import Persons from "./components/Persons";
import axios from "axios";
const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filterInput, setFilterInput] = useState("");

	useEffect(() => {
		axios
			.get("http://localhost:3001/persons")
			.then((response) => {
				const data = response.data
				setPersons(data)
				console.log("Data: ", data);
			})
			;
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
	const addNewName = (event) => {
		event.preventDefault();
		setPersons([{ name: newName, number: newNumber }, ...persons]);
		alert(`${newName} has already been added to phonebook`);
		setNewName("");
		setNewNumber("");
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
			<Persons list={fitlerResult} />
		</div>
	);
};

export default App;