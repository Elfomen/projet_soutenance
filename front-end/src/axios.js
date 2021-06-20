import axios from 'axios'

const event = axios.create({
    baseURL : "http://localhost:5000"
})

export default event