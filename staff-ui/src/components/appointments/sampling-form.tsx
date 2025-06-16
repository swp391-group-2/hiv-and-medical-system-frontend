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
import { LoadingOverlay } from "../loading-overlay";

const sampleTestSchema = z.object({
  sampleCode: z.string().nonempty("Mã mẫu không được bỏ trống"),
  sampleType: z.string().nonempty("Loại mẫu không được bỏ trống"),
});

const sampleConsultSchema = z.object({
  sampleCodeCD4: z
    .string()
    .nonempty("Mã mẫu xét nghiệm CD4 không được bỏ trống"),
  sampleTypeCD4: z
    .string()
    .nonempty("Loại mẫu xét nghiệm CD4 không được bỏ trống"),
  sampleCodeVirus: z
    .string()
    .nonempty("Mã mẫu xét nghiệm tải lượng virus không được bỏ trống"),
  sampleTypeVirus: z
    .string()
    .nonempty("Loại mẫu xét nghiệm tải lượng virus không được bỏ trống"),
});

type SampleTestValues = z.infer<typeof sampleTestSchema>;
type SampleConsultValues = z.infer<typeof sampleConsultSchema>;

export function SampleTestForm({ appt }: { appt: Appointment }) {
  const queryClient = useQueryClient();

  const form = useForm<SampleTestValues>({
    resolver: zodResolver(sampleTestSchema),
    defaultValues: {
      sampleCode: "",
      sampleType: "",
    },
  });

  const { mutate: checkIn, isPending } = useMutation<
    void,
    Error,
    SampleTestValues
  >({
    mutationFn: async (data: SampleTestValues) =>
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

  const onSubmit = (data: SampleTestValues) => {
    checkIn(data);
  };
  return (
    <Form {...form}>
      {isPending && <LoadingOverlay message="Đang tải..." />}
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

export function SampleConsultForm({ appt }: { appt: Appointment }) {
  const queryClient = useQueryClient();
  const form = useForm<SampleConsultValues>({
    resolver: zodResolver(sampleConsultSchema),
    defaultValues: {
      sampleCodeCD4: "",
      sampleTypeCD4: "",
      sampleCodeVirus: "",
      sampleTypeVirus: "",
    },
  });

  const { mutate: checkIn } = useMutation<void, Error, SampleConsultValues>({
    mutationFn: async (data: SampleConsultValues) =>
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

  const onSubmit = (data: SampleConsultValues) => {
    checkIn(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="sampleCodeCD4"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mã mẫu xét nghiệm CD4</FormLabel>
              <FormControl>
                <Input placeholder="Nhập mã mẫu xét nghiệm CD4" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sampleTypeCD4"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loại mẫu xét nghiệm CD4</FormLabel>
              <FormControl>
                <Input placeholder="Nhập loại mẫu xét nghiệm CD4" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sampleCodeVirus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mã mẫu xét nghiệm tải lượng virus</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập mã mẫu xét nghiệm tải lượng virus"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sampleTypeVirus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loại mẫu xét nghiệm tải lượng virus</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập loại mẫu xét nghiệm tải lượng virus"
                  {...field}
                />
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
