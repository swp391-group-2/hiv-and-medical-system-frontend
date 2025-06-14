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

export const login = async (value: LoginRequest) => {
  const response = await axios.post("/auth/login", value, {
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    responseType: "text",
  });

  return response.data;
};
// export async function login({ email, password }: { email: string; password: string }) {
//   const res = await fetch("http://localhost:8080/doctors");
//   if (!res.ok) throw new Error("Không thể kết nối máy chủ");

//   const doctors = await res.json();
//   const doctor = doctors.find(
//     (d: any) => d.email === email && d.password === password
//   );

//   if (!doctor) throw new Error("Email hoặc mật khẩu không đúng");

//   // Có thể trả về token giả lập hoặc thông tin doctor
//   return JSON.stringify({ email: doctor.email, name: doctor.fullName, id: doctor.id });
// }

export async function getCurrentUser(): Promise<User> {
  const res = await axios.get("/auth/user", { withCredentials: true });
  return res.data;
}
