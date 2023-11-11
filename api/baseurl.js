import axios from "axios";
export const portio = "http://192.168.1.3:5000";
const url = axios.create({
  baseURL: "http://192.168.1.3:5000/api",
});
export default url;
