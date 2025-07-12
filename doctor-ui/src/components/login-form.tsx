import { useForm, type ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
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

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Mail, Lock, LogIn, Loader2 } from "lucide-react";
import Logo from "./logo";
import authApi from "@/apis/auth.api";
import { useAuthStore } from "@/stores/auth.store";
import { useState } from "react";

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
  const [loginError, setLoginError] = useState<string>("");

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
      setLoginError(""); // Clear any previous errors
      // Map user object to match expected User type for loginStore
      const apiUser = data.data.data.user;
      const mappedUser = {
        ...apiUser,
        id: apiUser.userId ?? apiUser.userId ?? "", // fallback if id is named _id or missing
        name: apiUser.fullName ?? apiUser.fullName ?? apiUser.email ?? "", // fallback to fullName or email
      };
      loginStore(mappedUser);
      console.log("doctor email", mappedUser.email);
      console.log("Login successful:", mappedUser);
      console.log("Access Token:", data.data.data.accessToken);
      localStorage.setItem("accessToken", data.data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.data.refreshToken);
      localStorage.setItem("doctorEmail", data.data.data.user.email);
      localStorage.setItem("doctorName", data.data.data.user.fullName);
      toast.success("Login successful!", {
        description: `Chào mừng ${
          data.data.data.user.fullName || "bạn"
        } trở lại.`,
      });

      queryClient.invalidateQueries({
        queryKey: ["self"],
      });

      navigate("/doctor/dashboard");
    },
    onError: (error) => {
      // Check if it's an authentication error (wrong password/email)
      if (
        error.message.includes("401") ||
        error.message.includes("Unauthorized") ||
        error.message.includes("Invalid") ||
        error.message.includes("Wrong") ||
        error.message.toLowerCase().includes("password") ||
        error.message.toLowerCase().includes("email")
      ) {
        setLoginError(
          "Mật khẩu hoặc tài khoản sai. Vui lòng kiểm tra lại thông tin đăng nhập của bạn."
        );
      } else {
        setLoginError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
      }
    },
  });

  // const handleProviderLogin = (provider: AuthProviders) => {
  //   console.log(`Login with ${provider}`);
  //   // login with google
  // };

  return (
    <div className="overflow-hidden ">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl  shadow-lg border p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-2">
              <Logo />
            </div>
            <h1 className=" text-4xl font-bold text-gray-900">Đăng nhập</h1>
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
                    {loginError && (
                      <p className="text-sm text-red-600 mt-2">{loginError}</p>
                    )}
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

            </form>
          </Form>

         
        </div>
      </div>
    </div>
  );
};
