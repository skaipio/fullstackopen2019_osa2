import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const create = (person) => (
  axios
    .post(`${baseUrl}`, person)
    .then(response => response.data)
)

const remove = (personId) => (
  axios
    .delete(`${baseUrl}/${personId}`)
)

const update = (id, person) => (
  axios
    .put(`${baseUrl}/${id}`, person)
    .then(response => response.data)
)

export default {
  create,
  remove,
  update
}