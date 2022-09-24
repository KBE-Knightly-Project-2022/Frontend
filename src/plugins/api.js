import axios from "axios";
import store from "../store";

// backend url here
export const API_URL = `http://127.0.0.1:8000/api/`;

const $api = axios.create({
  // withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${store.state.auth.token}`;
  return config;
});

export default $api;
