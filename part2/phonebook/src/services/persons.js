import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = newObject => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => response.data);
};

const deleteById = id => {
  return axios.delete(`${baseUrl}/${id}`);
};

const updatePerson = (id, newObject) => {
  const personUrl = `${baseUrl}/${id}`;
  return axios.put(personUrl, newObject).then(response => response.data);
};

const personService = {
  getAll,
  create,
  deleteById,
  updatePerson,
};
export default personService;
