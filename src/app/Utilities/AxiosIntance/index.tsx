import axios from "axios";
import { error } from "console";
import { config } from "process";

const AxiosIntance = axios.create({
  baseURL: "https://your-api-base-url.com", // Replace with your API base URL
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
},
(error)=>{
    return Promise.reject(error);
});


export default AxiosIntance;
