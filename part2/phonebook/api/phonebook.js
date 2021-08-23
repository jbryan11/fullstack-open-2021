import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

function getAll() {
	return axios
		.get(baseUrl)
		.then((response) => response.data)
		.catch((error) => {
			console.error(error);
		});
}
function addPerson(form) {
	return axios
		.post(baseUrl, form)
		.then((response) => response.data)
		.catch((error) => {
			console.error(error);
		});
}

export default { getAll, addPerson };
