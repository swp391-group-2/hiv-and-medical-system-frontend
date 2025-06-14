import { useForm, type ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { type FC } from "react";
import * as auth from "@/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty("Vui lòng nhập email")
    .email("Email không hợp lệ"),
  password: z
    .string()
    .trim()
    .nonempty("Vui lòng nhập mật khẩu")
    .min(5, "Mật khẩu phải có ít nhất 5 ký tự"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type AuthProviders = "google";

export const LoginForm: FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, status } = useMutation({
    mutationFn: async (value: LoginFormValues) => await auth.login(value),
    onSuccess: (token) => {
      localStorage.setItem("token", token);
      queryClient.invalidateQueries({ queryKey: ["self"] });
      navigate("/doctor/dashboard");
    },
    onError: (error: unknown) => {
      const message =
        error && typeof error === "object" && "message" in error
          ? (error as { message?: string }).message
          : undefined;
      toast.error(message || "Đăng nhập thất bại");
    },
  });

  const handleProviderLogin = (provider: AuthProviders) => {
    console.log(`Login with ${provider}`);
    // Gọi API login social ở đây nếu có
  };

  return (
    <Form {...form}>
      <div className="w-full max-w-md mx-auto">
        <form
          onSubmit={form.handleSubmit((value) => login(value))}
          className="space-y-6 bg-white p-8 rounded-xl shadow-lg border"
        >
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Đăng nhập
          </h1>

          <FormField
            control={form.control}
            name="email"
            render={({
              field,
            }: {
              field: ControllerRenderProps<LoginFormValues, "email">;
            }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Nhập email" {...field} />
                </FormControl>
                <FormMessage />
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
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Nhập mật khẩu"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            disabled={status === "pending"}
          >
            {status === "pending" ? "Đang xử lý..." : "Đăng nhập"}
          </Button>

          <div className="text-right text-sm">
            <Link to="/forgot-password" className="text-blue-600 underline">
              Quên mật khẩu?
            </Link>
          </div>

          <Separator className="my-4" />

          <div className="text-center text-sm text-gray-500">
            Hoặc đăng nhập bằng
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleProviderLogin("google")}
            type="button"
          >
            Đăng nhập với Google
          </Button>
        </form>
      </div>
    </Form>
  );
};
