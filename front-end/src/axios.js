import axios from 'axios'

const event = axios.create({
    //baseURL : "https://frozen-wave-37700.herokuapp.com"
    baseURL : "http://localhost:5000"
})

export default event