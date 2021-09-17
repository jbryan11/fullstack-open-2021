var persons = require("../api/persons");
var express = require("express");
var router = express.Router();

function errorFound(name, number) {

	if (fieldIsEmpty(name, number)) return  "Please enter your name and number.";
	if(nameIsExisting(name)) return "Name already exist.";
	return 0;
}
function fieldIsEmpty(name, number) {
	return name && number ? false : true;
}
function nameIsExisting(name) {
	let result = persons.find((person) => person.name.toLowerCase() === name.toLocaleLowerCase());
	return result ? true : false;
}
function generateID() {
	return Math.floor(Math.random() * 2500);
	
}
/* GET users listing. */
router.get("/persons", (req, res) => {
	res.json(persons);
});
router.post("/persons", (req, res) => {
	let entry = req.body;
	let error = errorFound(entry.name,entry.number);
	if (error) {
		return res.status(404).render('error',{
		error:{
			status: 405,
			stack: error,
		},
		message: `Request not allowed`,
	})}
	const newEntry = { id: generateID(), ...entry };
	persons = [newEntry, ...persons];
	res.status(200).json(persons);
});
router.get("/persons/:id", (req, res, next) => {
	let id = parseInt(req.params.id);
	let person = persons.find((el) => el.id === id);
	if (!person) {
		res.status(404).render("error", {
			error: {
				status: 404,
				stack: "Data not found.",
			},
			message: `Cannot find ${req.path}`,
		});
	}
	res.json(person);
});
router.delete("/persons/:id", (req, res) => {
	const id = parseInt(req.params.id);
	persons = persons.filter((person) => person.id !== id);
	console.log(persons);
	res.status(204).end();
});
module.exports = router;
