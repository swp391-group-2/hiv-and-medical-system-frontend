import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import http from "@/api/http";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

export const CreateStaffForm = () => {
  const queryClient = useQueryClient();
  const schema = z
    .object({
      fullName: z
        .string()
        .min(1, "Tên phải có ít nhất một kí tự")
        .max(50, "Tên vượt quá số kí tự cho phép"),
      email: z.string().email("Email không hợp lệ"),
      role: z.enum(["MANAGER", "LAB_TECHNICIAN", "STAFF"]),
      password: z
        .string()
        .min(8, "Mật khẩu phải có ít nhất 8 kí tự")
        .max(20, "Mật khẩu không được vượt quá 20 kí tự"),
      confirm: z.string().nonempty("Vui lòng xác nhận mật khẩu"),
    })
    .refine((data) => data.password === data.confirm, {
      message: "Mật khẩu xác nhận không khớp",
      path: ["confirm"],
    });

  type StaffInitializedValues = z.infer<typeof schema>;

  const form = useForm<StaffInitializedValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      role: "STAFF",
      password: "",
      confirm: "",
    },
  });

  const { mutate: createStaff, isPending } = useMutation<
    void,
    AxiosError,
    StaffInitializedValues
  >({
    mutationFn: async ({ confirm, ...values }) =>
      await http.post(`/staffs`, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staffs"] });
      toast.success("Tạo tài khoản thành công");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = (values: StaffInitializedValues) => {
    createStaff(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Họ và tên</FormLabel>
              <FormControl>
                <Input id={field.name} type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Email</FormLabel>
              <FormControl>
                <Input id={field.name} type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Chọn chức vụ</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn chức vụ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="STAFF">Nhân viên</SelectItem>
                    <SelectItem value="MANAGER">Quản lý</SelectItem>
                    <SelectItem value="LAB_TECHNICIAN">
                      Nhân viên xét nghiệm
                    </SelectItem>
                  </SelectContent>
                </Select>
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
              <FormLabel htmlFor={field.name}>Mật khẩu</FormLabel>
              <FormControl>
                <Input id={field.name} type="password" {...field} />
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
              <FormLabel htmlFor={field.name}>Nhập lại mật khẩu</FormLabel>
              <FormControl>
                <Input id={field.name} type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-500 hover:bg-blue-600 cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang tạo...
            </>
          ) : (
            "Tạo mới"
          )}
        </Button>
      </form>
    </Form>
  );
};
