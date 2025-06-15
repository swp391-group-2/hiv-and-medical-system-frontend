import config from "@/constants/config";
import axios from "axios";

const apiGuest = axios.create({
  baseURL: config.baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiGuest;
