import { LoginForm } from "@/components/login-form";

const LoginPage = () => {
  return (
    <div className="flex h-screen justify-center items-center bg-blue-300 rounded">
      <div className="w-3/4 max-w-md ">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
