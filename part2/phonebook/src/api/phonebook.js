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
function deletePerson(id) {
	return axios
		.delete(`${baseUrl}/${id}`)
		.then((response) => response.status)
		.catch((error) => {
			console.error(error);
		});
}
// eslint-disable-next-line
export default {getAll, addPerson, deletePerson};
