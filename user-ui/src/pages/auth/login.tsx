import { LoginForm } from "@/components/login-form";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-3/4 max-w-md p-2 rounded">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
