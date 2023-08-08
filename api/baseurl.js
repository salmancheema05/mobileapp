import axios from 'axios'
const url = axios.create({
    baseURL:"http://192.168.1.4:5000/api"
})
export default url