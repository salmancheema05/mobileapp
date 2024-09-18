import axios from "axios";
export const portio = "https://chat-app-server-trxt.onrender.com";
const url = axios.create({
  baseURL: "https://chat-app-server-trxt.onrender.com/api",
});
export default url;
