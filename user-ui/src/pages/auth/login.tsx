import { LoginForm } from "@/components/login-form";

const LoginPage = () => {
  return (
    <div className="flex gap-2 p-2 mt-30  w-3/4 rounded">
      <div className="w-full h-full rounded bg-blue-400">Phương</div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
