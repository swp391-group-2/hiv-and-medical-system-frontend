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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Appointment } from "@/types/types";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const sampleFormSchema = z.object({
  sampleCode: z.string().nonempty("Mã mẫu không được bỏ trống"),
  sampleType: z.string().nonempty("Loại mẫu không được bỏ trống"),
});

type SampleFormValues = z.infer<typeof sampleFormSchema>;

export function SampleForm({ appt }: { appt: Appointment }) {
  const queryClient = useQueryClient();

  const form = useForm<SampleFormValues>({
    resolver: zodResolver(sampleFormSchema),
    defaultValues: {
      sampleCode: "",
      sampleType: "",
    },
  });

  const { mutate: checkIn } = useMutation<void, Error, SampleFormValues>({
    mutationFn: async (data: SampleFormValues) =>
      await axios.post(
        `/api/appointments/${appt.appointmentId}/check-in`,
        data
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      toast.success("Check-in thành công!");
    },
    onError: (err) => {
      const msg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : err.message;
      toast.error(msg);
    },
  });

  const onSubmit = (data: SampleFormValues) => {
    checkIn(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="sampleCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mã mẫu xét nghiệm</FormLabel>
              <FormControl>
                <Input placeholder="Nhập mã mẫu xét nghiệm" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sampleType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loại mẫu</FormLabel>
              <FormControl>
                <Input placeholder="Nhập loại mẫu xét nghiệm" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant="outline"
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 hover:text-white text-white cursor-pointer"
        >
          Xác nhận
        </Button>
      </form>
    </Form>
  );
}
