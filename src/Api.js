import axios from "axios";

// Correctly reference the specific environment variable
const baseURL = import.meta.env.VITE_MY_API;

console.log("baseUrl", baseURL); // This should now log "http://localhost:5000/"

export const Api = axios.create({
  baseURL,
});
