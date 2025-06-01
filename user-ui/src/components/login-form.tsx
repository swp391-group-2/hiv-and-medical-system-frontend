import { useForm, type ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { NavLink, useNavigate } from "react-router-dom";
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
import * as auth from "@/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const loginSchema = z.object({
  phone: z.string().regex(/^0\d{10}$/, "Số điện thoại không hợp lệ"),
  password: z.string().min(5, "Mật khẩu phải có ít nhất 5 ký tự"),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type AuthProviders = "google";

export const LoginForm: FC = () => {
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const queryClient = useQueryClient();
  const { mutate: login, status } = useMutation({
    mutationFn: async (value: LoginFormValues) => await auth.login(value),
    onSuccess: (token) => {
      localStorage.setItem("token", token);

      queryClient.invalidateQueries({
        queryKey: ["self"],
      });

      navigate("/");
    },
    onError: (error) => toast.error(error.message),
  });
  const handleProviderLogin = (provider: AuthProviders) => {
    console.log(`Login with ${provider}`);
    // Handle provider login logic here
  };
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
            name="phone"
            render={({
              field,
            }: {
              field: ControllerRenderProps<LoginFormValues, "phone">;
            }) => (
              <FormItem className="">
                <FormLabel className="">Số điện thoại</FormLabel>
                <FormControl>
                  <Input
                    className=""
                    type="text"
                    placeholder="Nhập số điện thoại"
                    {...field}
                  />
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
              <FormItem className="">
                <FormLabel className="">Mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    className=""
                    type="password"
                    placeholder="Nhập mật khẩu"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="" />
              </FormItem>
            )}
          />
          {status === "pending" ? (
            <Button type="submit" disabled className="w-full bg-gray-500">
              Đăng nhập
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 cursor-pointer"
            >
              Đăng nhập
            </Button>
          )}
          <Separator className="mb-2" />
          <div className="flex justify-center">
            <span className="font-medium">Hoặc</span>
          </div>
          <Button
            variant="outline"
            className="w-full cursor-pointer"
            onClick={() => handleProviderLogin("google")}
          >
            Đăng nhập với Google
          </Button>

          <div className="flex justify-between text-sm">
            <a href="/forgot-password" className="underline text-blue-600">
              Quên mật khẩu?
            </a>
          </div>
          <div className="flex justify-between text-sm">
            Chưa có tài khoản?{" "}
            <NavLink
              to="/auth/register"
              className="underline underline-offset-4"
            >
              Đăng ký ngay!
            </NavLink>
          </div>
        </form>
      </div>
    </Form>
  );
};
