import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SETVER_API_URL,
    headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
        }
        : undefined,
});

export default axiosInstance