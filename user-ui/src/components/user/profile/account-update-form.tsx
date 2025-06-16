import { useForm, type ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
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
import { useState } from "react";

const schema = z
  .object({
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(5, "Mật khẩu phải có ít nhất 5 ký tự"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Mật khẩu không khớp.",
    path: ["confirm"],
  });

export type AccountUpdateFormValues = z.infer<typeof schema>;
interface AccountUpdateFormProps {
  email: string;
  onSubmit: (values: AccountUpdateFormValues) => void;
}

export const AccountUpdateForm: React.FC<AccountUpdateFormProps> = ({
  email,
  onSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<AccountUpdateFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: email,
      password: "",
      confirm: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <FormField
          control={form.control}
          name="email"
          render={({
            field,
          }: {
            field: ControllerRenderProps<AccountUpdateFormValues, "email">;
          }) => (
            <FormItem className="">
              <FormLabel className="">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  readOnly
                  className="bg-gray-100 cursor-not-allowed"
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
            field: ControllerRenderProps<AccountUpdateFormValues, "password">;
          }) => (
            <FormItem className="mt-4">
              <FormLabel className="">Mật khẩu mới</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    className=""
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu mới"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center"
                  >
                    {showPassword ? (
                      <Eye className="w-5 h-5 text-gray-500 cursor-pointer" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-gray-500 cursor-pointer" />
                    )}
                  </button>
                </div>
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
            field: ControllerRenderProps<AccountUpdateFormValues, "confirm">;
          }) => (
            <FormItem className="mt-4">
              <FormLabel className="">Nhập lại mật khẩu</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    type={showConfirm ? "text" : "password"}
                    className=""
                    placeholder="Nhập lại mật khẩu"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center"
                  >
                    {showConfirm ? (
                      <Eye className="w-5 h-5 text-gray-500 cursor-pointer" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-gray-500 cursor-pointer" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="" />
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-2 mt-4">
          <Button
            className="bg-blue-500 hover:bg-blue-600 cursor-pointer"
            type="submit"
          >
            Lưu thay đổi
          </Button>
        </div>
      </form>
    </Form>
  );
};
