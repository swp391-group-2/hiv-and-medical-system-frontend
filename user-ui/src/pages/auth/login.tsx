import { LoginForm } from "@/components/login-form";

const LoginPage = () => {
  return (
    <div className="flex bg-primary/50 justify-center items-center h-screen">
      <div className="w-3/4 max-w-md p-2 rounded">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
