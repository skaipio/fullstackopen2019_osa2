import axios from 'axios'

const url = 'http://localhost:3001'

const create = (person) => (
  axios
    .post(`${url}/persons`, person)
    .then(response => response.data)
)

const remove = (personId) => (
  axios
    .delete(`${url}/persons/${personId}`)
)

export default {
  create,
  remove
}