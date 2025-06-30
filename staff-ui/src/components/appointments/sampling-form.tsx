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
import { Button } from "@/components/ui/button";
import type { Appointment } from "@/types/types";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "../ui/select";

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="sampleCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mã mẫu xét nghiệm</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn mã mẫu xét nghiệm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Mã mẫu</SelectLabel>
                      <SelectItem value="AB_SERUM1">AB_SERUM1</SelectItem>
                      <SelectItem value="AG_PLAS2">AG_PLAS2</SelectItem>
                      <SelectItem value="DNA_WB3">DNA_WB3</SelectItem>
                      <SelectItem value="RNA_CSF4">RNA_CSF4</SelectItem>
                      <SelectItem value="SALIVA5">SALIVA5</SelectItem>
                      <SelectItem value="URINE6">URINE6</SelectItem>
                      <SelectItem value="TISSUE7">TISSUE7</SelectItem>
                      <SelectItem value="DRYSP8">DRYSP8</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn loại mẫu xét nghiệm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Loại mẫu</SelectLabel>
                      <SelectItem value="Huyết thanh">Huyết thanh</SelectItem>
                      <SelectItem value="Huyết tương">Huyết tương</SelectItem>
                      <SelectItem value="Máu toàn phần">
                        Máu toàn phần
                      </SelectItem>
                      <SelectItem value="Dịch não tủy">Dịch não tủy</SelectItem>
                      <SelectItem value="Nước bọt">Nước bọt</SelectItem>
                      <SelectItem value="Nước tiểu">Nước tiểu</SelectItem>
                      <SelectItem value="Mảnh mô">Mảnh mô</SelectItem>
                      <SelectItem value="Giấy thấm máu khô">
                        Giấy thấm máu khô
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant="outline"
          disabled={isPending}
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 hover:text-white text-white cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang xử lý...
            </>
          ) : (
            "Xác nhận"
          )}
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

  const { mutate: checkIn, isPending } = useMutation<
    void,
    Error,
    SampleConsultValues
  >({
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
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn mã mẫu xét nghiệm CD4" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Mã mẫu CD4</SelectLabel>
                      <SelectItem value="CD4_EDTA1">CD4_EDTA1</SelectItem>
                      <SelectItem value="CD4_WB2">CD4_WB2</SelectItem>
                      <SelectItem value="CD4_LYS3">CD4_LYS3</SelectItem>
                      <SelectItem value="CD4_PBMC4">CD4_PBMC4</SelectItem>
                      <SelectItem value="CD4_PLAS5">CD4_PLAS5</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn loại mẫu xét nghiệm CD4" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Loại mẫu CD4</SelectLabel>
                      <SelectItem value="Máu toàn phần (EDTA)">
                        Máu toàn phần (EDTA)
                      </SelectItem>
                      <SelectItem value="Máu toàn phần">
                        Máu toàn phần
                      </SelectItem>
                      <SelectItem value="Lymphocyte">Lymphocyte</SelectItem>
                      <SelectItem value="Tế bào máu ngoại vi đơn nhân">
                        Tế bào máu ngoại vi đơn nhân
                      </SelectItem>
                      <SelectItem value="Huyết tương">Huyết tương</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn mã mẫu tải lượng virus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Mã mẫu tải lượng</SelectLabel>
                      <SelectItem value="VL_PLAS1">VL_PLAS1</SelectItem>
                      <SelectItem value="VL_DRYSP2">VL_DRYSP2</SelectItem>
                      <SelectItem value="VL_SERUM3">VL_SERUM3</SelectItem>
                      <SelectItem value="VL_CSF4">VL_CSF4</SelectItem>
                      <SelectItem value="VL_WB5">VL_WB5</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn loại mẫu tải lượng virus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Loại mẫu tải lượng</SelectLabel>
                      <SelectItem value="Huyết tương">Huyết tương</SelectItem>
                      <SelectItem value="Giấy thấm máu khô">
                        Giấy thấm máu khô
                      </SelectItem>
                      <SelectItem value="Huyết thanh">Huyết thanh</SelectItem>
                      <SelectItem value="Dịch não tủy">Dịch não tủy</SelectItem>
                      <SelectItem value="Máu toàn phần">
                        Máu toàn phần
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant="outline"
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-500 hover:bg-blue-600 hover:text-white text-white cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang xử lý...
            </>
          ) : (
            "Xác nhận"
          )}
        </Button>
      </form>
    </Form>
  );
}
