import { RegForm } from "@/components/register-form";

const RegisterPage = () => {
  return (
    <div className="flex justify-center bg-primary/50 items-center h-screen">
      <div className="w-3/4 max-w-md p-2 rounded">
        <RegForm />
      </div>
    </div>
  );
};

export default RegisterPage;
