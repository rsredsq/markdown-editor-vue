import axios from "axios";

const BASE_URL = "http://localhost:3000";

const API_URL = `${BASE_URL}/api/1.0/markdowns`;

function newDocument(title, content) {
  return axios.post(API_URL, { title, content }).then(res => res.data);
}

function deleteDocument(id) {
  return axios.delete(`${API_URL}/${id}`).then(res => res.data);
}

export default { newDocument, deleteDocument };
