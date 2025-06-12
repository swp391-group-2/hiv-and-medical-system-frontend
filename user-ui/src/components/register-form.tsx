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
import * as auth from "@/apis/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const regSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Tên phải chứa ít nhất một kí tự")
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
type AuthProviders = "google";

export const RegForm: FC = () => {
  const navigate = useNavigate();

  const form = useForm<RegFormValues>({
    resolver: zodResolver(regSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  const queryClient = useQueryClient();
  const { mutate: register, status } = useMutation({
    mutationFn: async (value: RegFormValues) => await auth.register(value),
    onSuccess: (token) => {
      localStorage.setItem("token", token);

      queryClient.invalidateQueries({
        queryKey: ["self"],
      });

      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleProviderLogin = (provider: AuthProviders) => {
    console.log(`Login with ${provider}`);
    // Handle provider login logic here
    if (provider === "google") {
      // Redirect to Google OAuth or handle Google login
      window.location.href = "/api/auth/google";
    }
  };

  return (
    <Form {...form}>
      <div className="w-full max-w-md mx-auto">
        <form
          onSubmit={form.handleSubmit((value) => register(value))}
          className="space-y-6 bg-white p-6 rounded-xl shadow-md"
        >
          <h1 className="text-2xl font-bold text-center">Đăng ký</h1>

          <FormField
            control={form.control}
            name="fullName"
            render={({
              field,
            }: {
              field: ControllerRenderProps<RegFormValues, "fullName">;
            }) => (
              <FormItem className="">
                <FormLabel className="">Họ và Tên</FormLabel>
                <FormControl>
                  <Input
                    className=""
                    type="text"
                    placeholder="Nhập họ và tên"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({
              field,
            }: {
              field: ControllerRenderProps<RegFormValues, "email">;
            }) => (
              <FormItem className="">
                <FormLabel className="">Email</FormLabel>
                <FormControl>
                  <Input
                    className=""
                    type="text"
                    placeholder="Nhập email cá nhân của bạn"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
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

          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nhập lại mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={status === "pending"}
            className="w-full"
          >
            {status === "pending" ? "Đang đăng ký..." : "Đăng ký"}
          </Button>

          <Separator />

          <div className="text-center text-sm text-gray-500">Hoặc</div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => handleProviderLogin("google")}
          >
            Đăng ký với Google
          </Button>

          <div className="text-center text-sm">
            Đã có tài khoản?{" "}
            <NavLink to="/login" className="underline underline-offset-4">
              Đăng nhập ngay!
            </NavLink>
          </div>
        </form>
      </div>
    </Form>
  );
};
