import { useForm, type ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "./ui/separator";
import { type FC } from "react";
import authApi from "@/api/auth.api";
import { useAuthStore } from "@/stores/auth.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Mail, Lock, Loader2, LogIn } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(5, "Mật khẩu phải có ít nhất 5 ký tự"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
//type AuthProviders = "google";

export const LoginForm: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginStore = useAuthStore((state) => state.login);
  const navigationState: { email: string } = location.state;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: navigationState?.email || "",
      password: "",
    },
  });

  const queryClient = useQueryClient();
  const { mutate: login, status } = useMutation({
    mutationFn: async (value: LoginFormValues) => await authApi.login(value),
    onSuccess: (data) => {
      loginStore(data.data.data.user);
      toast.success("Đăng nhập thành công!", {
        description: `Chào mừng ${
          data.data.data.user.fullName || "bạn"
        } trở lại.`,
      });

      queryClient.invalidateQueries({
        queryKey: ["self"],
      });

      navigate("/staff/dashboard");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  // const handleProviderLogin = (provider: AuthProviders) => {
  //   console.log(`Login with ${provider}`);
  //   // Handle provider login logic here
  // };
  return (
    <Form {...form}>
      <div className="w-full max-w-md mx-auto">
        <form
          onSubmit={form.handleSubmit((value) => login(value))}
          className="space-y-6 bg-white p-6 rounded shadow-md"
        >
          <h1 className="text-2xl font-bold text-center">Đăng nhập</h1>
          <FormField
            control={form.control}
            name="email"
            render={({
              field,
            }: {
              field: ControllerRenderProps<LoginFormValues, "email">;
            }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Email
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400" />
                    <Input
                      className="pl-12 h-12 border-gray-200 rounded-xl"
                      type="text"
                      placeholder="Nhập địa chỉ email"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({
              field,
            }: {
              field: ControllerRenderProps<LoginFormValues, "password">;
            }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Mật khẩu
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-gray-400" />
                    <Input
                      className="pl-12 pr-3 h-12 border-gray-200 rounded-xl "
                      type="password"
                      placeholder="Nhập mật khẩu"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            disabled={status === "pending"}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors cursor-pointer"
          >
            {status === "pending" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang đăng nhập...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Đăng nhập
              </>
            )}
          </Button>
          <div className="relative">
            <Separator className="my-3" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-3 text-sm text-gray-500 font-medium">
                Hoặc
              </span>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 font-semibold rounded-xl transition-all duration-200 group cursor-pointer"
          >
            <svg
              className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform"
              viewBox="0 0 24 24"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Đăng ký với Google
          </Button>

          <div className="mt-8 space-y-4">
            <div className="text-center">
              <a
                href="/auth/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline"
              >
                Quên mật khẩu?
              </a>
            </div>
          </div>
        </form>
      </div>
    </Form>
  );
};
