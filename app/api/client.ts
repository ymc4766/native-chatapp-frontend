import axios from "axios";

// const baseURL = "http://192.168.0.101:8000/api";
export const baseURL = "http://192.168.43.176:8000/api";
const client = axios.create({ baseURL });

export default client;
