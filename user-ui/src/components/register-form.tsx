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

const regSchema = z
  .object({
    phone: z.string().regex(/^0\d{9}$/, "Số điện thoại không hợp lệ"),
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
      phone: "",
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
          onSubmit={form.handleSubmit((value) => register(value))}
          className="space-y-6 bg-white p-6 rounded shadow-md"
        >
          <h1 className="text-2xl font-bold text-center">Đăng kí</h1>
          <FormField
            control={form.control}
            name="phone"
            render={({
              field,
            }: {
              field: ControllerRenderProps<RegFormValues, "phone">;
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
              field: ControllerRenderProps<RegFormValues, "password">;
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
          <FormField
            control={form.control}
            name="confirm"
            render={({
              field,
            }: {
              field: ControllerRenderProps<RegFormValues, "confirm">;
            }) => (
              <FormItem className="">
                <FormLabel className="">Nhập lại mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    className=""
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="" />
              </FormItem>
            )}
          />
          {status === "pending" ? (
            <Button type="submit" disabled className="w-full bg-gray-500">
              Đăng kí
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 cursor-pointer"
            >
              Đăng kí
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
            Đã có tài khoản?{" "}
            <NavLink to="/auth/login" className="underline underline-offset-4">
              Đăng nhập ngay!
            </NavLink>
          </div>
        </form>
      </div>
    </Form>
  );
};
