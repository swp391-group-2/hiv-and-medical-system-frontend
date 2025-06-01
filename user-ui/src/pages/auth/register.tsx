import { RegForm } from "@/components/register-form";

const RegisterPage = () => {
  return (
    <div className="flex gap-2 p-2 mt-30 w-3/4 rounded">
      <div className="w-full h-full rounded bg-blue-400"></div>
      <RegForm />
    </div>
  );
};

export default RegisterPage;
