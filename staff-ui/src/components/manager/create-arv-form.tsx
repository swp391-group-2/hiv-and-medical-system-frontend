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
import { Textarea } from "../ui/textarea";

export const CreateArvForm = () => {
  const queryClient = useQueryClient();
  const schema = z.object({
    name: z.string().nonempty("Tên phác đồ không được bỏ trống"),
    contraindication: z
      .string()
      .nonempty("Nếu không có chống chỉ định, ghi 'Không có'"),
    sideEffect: z
      .string()
      .nonempty("Nếu không có tác dụng phụ, ghi 'Không có'"),
    dosageForm: z.string().nonempty("Dạng thuốc không được bỏ trống"),
    instructions: z.string().nonempty("Chỉ dẫn uống không được bỏ trống"),
    prescriptionItems: z.array(
      z.object({
        dosage: z.string().nonempty("Liều lượng không được bỏ trống"),
        frequency: z.string().nonempty("Tần suất uống không được bỏ trống"),
        duration: z.string().nonempty(),
        medicationId: z.number().nonnegative("Id không hợp lệ"),
      })
    ),
  });

  type ArvInitializedValues = z.infer<typeof schema>;

  const form = useForm<ArvInitializedValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      contraindication: "",
      sideEffect: "",
      dosageForm: "",
      instructions: "",
      prescriptionItems: [],
    },
  });

  const { mutate: createArv, isPending } = useMutation<
    void,
    AxiosError,
    ArvInitializedValues
  >({
    mutationFn: async (values) => await http.post(`/prescriptions`, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prescriptions"] });
      toast.success("Tạo phác đồ thành công");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleSubmit = (values: ArvInitializedValues) => {
    createArv(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Tên phác đồ</FormLabel>
              <FormControl>
                <Input id={field.name} type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contraindication"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Chống chỉ định</FormLabel>
              <FormControl>
                <Textarea id={field.name} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sideEffect"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Tác dụng phụ</FormLabel>
              <FormControl>
                <Textarea id={field.name} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dosageForm"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Dạng thuốc</FormLabel>
              <FormControl>
                <Input id={field.name} type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Chỉ dẫn uống</FormLabel>
              <FormControl>
                <Textarea id={field.name} {...field} />
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
