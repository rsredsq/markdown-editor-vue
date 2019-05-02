import axios from "axios";

const BASE_URL = "http://localhost:3000";

const API_URL = `${BASE_URL}/api/1.0/markdowns`;

function newDocument(title, content) {
  return axios.post(API_URL, { title, content }).then(res => res.data);
}

function deleteDocument(id) {
  return axios.delete(`${API_URL}/${id}`).then(res => res.data);
}

function fetchDocuments() {
  return axios.get(API_URL).then(res => res.data);
}

function fetchDocument(id) {
  return axios.get(`${API_URL}/${id}`).then(res => res.data);
}

function saveDocument(id, title, content) {
  return axios
    .put(`${API_URL}/${id}`, { title, content })
    .then(res => res.data);
}

export default {
  newDocument,
  deleteDocument,
  fetchDocuments,
  fetchDocument,
  saveDocument
};
