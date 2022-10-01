import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://identitytoolkit.googleapis.com/v1";
export const firebaseAuthAPI: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});
