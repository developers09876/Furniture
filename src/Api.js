import axios from "axios";

const baseURL = import.meta.env.VITE_MY_API;

console.log("baseUrl", baseURL);

export const Api = axios.create({
  baseURL,
});
