import axios from 'axios'
const url = axios.create({
    baseURL:"http://192.168.1.8:5000/api",
    responseType:"json",
    withCredentials:"true"
})
export default url