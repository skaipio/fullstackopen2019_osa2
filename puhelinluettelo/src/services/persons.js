import axios from 'axios'

const url = 'http://localhost:3001'

const create = (person) => (
  axios
    .post(`${url}/persons`, person)
    .then(response => response.data)
)

export default {
  create
}