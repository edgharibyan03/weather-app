import axios from "axios";

const API = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 5000
})

export default API;