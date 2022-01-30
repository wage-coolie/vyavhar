import axios from 'axios'
const instance = axios.create({
    baseURL: "https://cryptic-coast-01230.herokuapp.com/api"
})
export default instance