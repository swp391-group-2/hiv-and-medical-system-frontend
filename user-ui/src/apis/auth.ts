import axios from "axios";

type RegisterRequest = {
  email: string;
  fullName: string;
  password: string;
  confirm: string;
};

export const register = async (value: RegisterRequest) => {
  const response = await axios.post("/auth/register", value, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    responseType: "text",
  });

  return response.data;
};

type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (value: LoginRequest) => {
  const response = await axios.post("/auth/login", value, {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    responseType: "text",
  });

  return response.data;
};
