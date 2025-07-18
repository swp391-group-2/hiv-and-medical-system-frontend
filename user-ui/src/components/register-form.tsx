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
