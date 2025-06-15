import { useForm, type ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink, useNavigate } from "react-router-dom";
import { Mail, User, Lock, Loader2 } from "lucide-react";
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
import { useMutation } from "@tanstack/react-query";
import authApi from "@/apis/auth.api";
import { toast } from "sonner";

const regSchema = z
  .object({
    fullName: z
      .string()
      .min(5, "Tên phải chứa ít nhất 5 kí tự")
      .max(50, "Vượt quá số ký tự cho phép"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(5, "Mật khẩu phải có ít nhất 5 ký tự"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Mật khẩu không khớp.",
    path: ["confirm"],
  });

type RegFormValues = z.infer<typeof regSchema>;

export const RegForm = () => {
  const navigate = useNavigate();

  const form = useForm<RegFormValues>({
    resolver: zodResolver(regSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirm: "",
    },
  });

  const { mutate: register, status } = useMutation({
    mutationFn: async (value: Omit<RegFormValues, "confirm">) =>
      await authApi.registerAccount(value),
    onSuccess: (data) => {
      toast.success("Đăng ký thành công!", {
        description: `Chào mừng "bạn" đến với hệ thống.`,
      });
      navigate("/auth/login", {
        state: {
          email: data.data.data.email,
        },
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        description: "Vui lòng kiểm tra lại thông tin đăng ký của bạn.",
      });
    },
  });

  return (
    <div className="">
      <div className="w-full max-w-lg">
        <div className="bg-white backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 space-y-8">
          {/* Header */}
          <div className="text-center ">
            <h1 className="text-4xl font-bold ">Đăng ký</h1>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((value) => {
                const registerData: Omit<RegFormValues, "confirm"> = {
                  email: value.email,
                  password: value.password,
                  fullName: value.fullName,
                };
                register(registerData);
              })}
              className="space-y-1"
            >
              {/* Full Name Field */}
              <FormField
                control={form.control}
                name="fullName"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<RegFormValues, "fullName">;
                }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-sm font-semibold text-gray-700">
                      Họ và Tên
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400  " />
                        <Input
                          className="pl-12 h-12 border-2 border-gray-200 rounded-xl bg-gray-50/50 focus:bg-white"
                          type="text"
                          placeholder="Nhập họ và tên của bạn"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<RegFormValues, "email">;
                }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gray-700">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 " />
                        <Input
                          className="pl-12 h-12 border-2 border-gray-200 rounded-xl   "
                          type="text"
                          placeholder="example@email.com"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-semibold text-gray-700">
                      Mật khẩu
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 " />
                        <Input
                          className="pl-12 pr-3 h-12 border-2 border-gray-200 rounded-xl "
                          type="password"
                          placeholder="Nhập mật khẩu"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-semibold text-gray-700">
                      Nhập lại mật khẩu
                    </FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 " />
                        <Input
                          className="pl-12 pr-3 h-12 border-2 border-gray-200 rounded-xl "
                          type="password"
                          placeholder="Nhập lại mật khẩu"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={status === "pending"}
                className="mt-5 w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600  "
              >
                {status === "pending" ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Đang đăng ký...
                  </>
                ) : (
                  "Tạo tài khoản"
                )}
              </Button>

              {/* Separator */}
              <div className="relative my-3">
                <Separator className="bg-gray-200" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-white px-4 text-sm text-gray-500 font-medium">
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

              {/* Login Link */}
              <div className="text-center text-sm text-gray-600 pt-2">
                Đã có tài khoản?{" "}
                <NavLink
                  to="/auth/login"
                  className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                >
                  Đăng nhập ngay
                </NavLink>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
