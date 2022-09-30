import axios from "axios";
import store from "../store";

// backend url here
export const API_URL = `http://localhost:8083/`;

const $api = axios.create({
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  // config.headers.Authorization = "Bearer " + localStorage.getItem("keycloakToken"); this breaks everything, do not touch
  return config;
});

export default $api;
