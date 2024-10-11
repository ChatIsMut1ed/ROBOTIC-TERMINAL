import axios from "axios";

const axiosAuthClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL_2,
  // withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

export default axiosAuthClient;
