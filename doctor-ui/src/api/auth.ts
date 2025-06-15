import axios from "axios";

type LoginRequest = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

// export const login = async (value: LoginRequest) => {
//   const response = await axios.post("/auth/login", value, {
//     headers: { Accept: "application/json", "Content-Type": "application/json" },
//     responseType: "text",
//   });

//   return response.data;
// };
export const login = async (value: LoginRequest) => {
  const response = await axios.post("/auth/login", value, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return response.data; // return cả { token, user }
};

export async function getCurrentUser(): Promise<User> {
  const res = await axios.get("/auth/user", { withCredentials: true });
  return res.data;
}
