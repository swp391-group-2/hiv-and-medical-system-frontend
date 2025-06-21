import { useForm, type ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
import authApi from "@/apis/auth.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import Logo from "./logo";
import { useAuthStore } from "@/stores/auth.store";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(5, "Mật khẩu phải có ít nhất 5 ký tự"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
// type AuthProviders = "google";

export const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginStore = useAuthStore((state) => state.login);
  const navigationState: { email: string } = location.state;
  const fromPath = location?.state?.from.pathname || "/";

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
      toast.success("Login successful!", {
        description: `Chào mừng ${
          data.data.data.user.fullName || "bạn"
        } trở lại.`,
      });

      queryClient.invalidateQueries({
        queryKey: ["self"],
      });

      navigate(fromPath);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="overflow-hidden ">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl  shadow-lg border p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-2">
              <Logo />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Đăng nhập</h1>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((value) => login(value))}
              className="space-y-6"
            >
              {/* Email Field */}
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
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

              {/* Login Button */}
              <Button
                type="submit"
                disabled={status === "pending"}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
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

              {/* Divider */}
              <div className="relative">
                <Separator className="my-3" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-3 text-sm text-gray-500 font-medium">
                    Hoặc
                  </span>
                </div>
              </div>

              {/* Google Button */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 font-semibold rounded-xl transition-all duration-200 group"
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
            </form>
          </Form>

          {/* Footer Links */}
          <div className="mt-8 space-y-4">
            <div className="text-center">
              <a
                href="/auth/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline"
              >
                Quên mật khẩu?
              </a>
            </div>
            <div className="text-center text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <NavLink
                to="/auth/register"
                className="text-blue-600 hover:text-blue-800 font-medium underline-offset-4 hover:underline"
              >
                Đăng ký ngay!
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
