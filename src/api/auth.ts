type RegisterRequest = {
  phone: string;
  password: string;
  confirmPw: string;
};

export const register = async (value: RegisterRequest) => {
  const response = await fetch("/auth/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });

  if (!response.ok) {
    throw new Error("Số điện thoại đã từng đăng ký trước đó.");
  }

  return await response.text();
};

type LoginRequest = {
  phone: string;
  password: string;
};

export const login = async (value: LoginRequest) => {
  const response = await fetch("/auth/login", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(value),
  });
  if (!response.ok) {
    throw new Error("Số điện thoại hoặc mật khẩu không đúng.");
  }

  return await response.text();
};
