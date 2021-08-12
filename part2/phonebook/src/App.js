import React, { useState } from "react";
import Filter from "./components/Filter";
import InputForm from "./components/InputForm";
import Input from "./components/Input";
import Persons from "./components/Persons";
const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", phone: "034-123456" },
		{ name: "Ada Lovelace", phone: "39-44-5323523" },
		{ name: "Dan Abramov", phone: "12-43-234345" },
		{ name: "Mary Poppendieck", phone: "39-23-6423122" },
	]);
	const [newName, setNewName] = useState("");
	const [newPhone, setNewPhone] = useState("");
	const [filterInput, setFilterInput] = useState("");
	const handleInputName = (event) => {
		setNewName(event.target.value);
	};
	const handleInputPhone = (event) => {
		setNewPhone(event.target.value);
	};
	const handleFilterInput = (event) => {
		setFilterInput(event.target.value);
	};
	const addNewName = (event) => {
		event.preventDefault();
		setPersons([{ name: newName, phone: newPhone }, ...persons]);
		alert(`${newName} has already been added to phonebook`);
		setNewName("");
		setNewPhone("");
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
				<Input handler={handleInputName} value={newName}>Name</Input>
				<Input handler={handleInputPhone} value={newPhone}>Phone</Input>
			</InputForm>
			<h2>Numbers</h2>
			<Persons list={fitlerResult}/>
		</div>
	);
};

export default App;
