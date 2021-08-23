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
		
}
function updatePerson(id, data) {
	return axios
		.put(`${baseUrl}/${id}`, data)
		.then((response) => response.status)
}
// eslint-disable-next-line
export default { getAll, addPerson, deletePerson, updatePerson };
