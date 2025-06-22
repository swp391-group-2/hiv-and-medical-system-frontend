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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Appointment } from "@/types/types";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { LoadingOverlay } from "../loading-overlay";

const resultTextSchema = z.object({
  resultText: z.enum(["Dương tính", "Âm tính"], {
    required_error: "Vui lòng chọn kết quả",
  }),
  conclusion: z.string().nonempty("Kết luận không được để trống"),
  note: z.string().optional(),
});

type ResultTextValues = z.infer<typeof resultTextSchema>;

export function ResultTextForm({ appt }: { appt: Appointment }) {
  const queryClient = useQueryClient();

  const form = useForm<ResultTextValues>({
    resolver: zodResolver(resultTextSchema),
    defaultValues: {
      resultText:
        appt.labResult.resultText === "Dương tính" ||
        appt.labResult.resultText === "Âm tính"
          ? appt.labResult.resultText
          : undefined,
      conclusion: "",
      note: "",
    },
  });

  const { mutate: updateResult, isPending } = useMutation<
    void,
    Error,
    ResultTextValues
  >({
    mutationFn: async (data: ResultTextValues) =>
      await axios.put(`/api/lab-samples/${appt.labSampleId}/results`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      toast.success("Cập nhật kết quả thành công!");
    },
    onError: (err) => {
      const msg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : err.message;
      toast.error(msg);
    },
  });

  const onSubmit = (values: ResultTextValues) => {
    updateResult(values);
  };

  if (isPending) {
    return <LoadingOverlay message="Đang xử lý..." />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="resultText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kết quả</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn kết quả" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dương tính">Dương tính</SelectItem>
                    <SelectItem value="Âm tính">Âm tính</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="conclusion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kết luận</FormLabel>
              <FormControl>
                <Textarea
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  placeholder="Nhập kết luận"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ghi chú (nếu có)</FormLabel>
              <FormControl>
                <Textarea
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  placeholder="Nhập ghi chú"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          variant="outline"
          className={cn(
            "w-full cursor-pointer bg-green-500 hover:bg-green-600 text-white hover:text-white",
            isPending ? " cursor-now-allowed bg-gray-400" : ""
          )}
          type="submit"
        >
          {isPending ? "Đang gửi..." : "Gửi kết quả"}
        </Button>
      </form>
    </Form>
  );
}

const numericSchema = z.object({
  resultNumericCD4: z.number({ required_error: "Required" }).min(0),
  resultNumericViralLoad: z.number({ required_error: "Required" }).min(0),
  conclusion: z.string().nonempty("Kết luận không được để trống."),
  note: z.string().optional(),
});

type NumericValues = z.infer<typeof numericSchema>;

export function ResultNumericForm({ appt }: { appt: Appointment }) {
  const queryClient = useQueryClient();

  const form = useForm<NumericValues>({
    resolver: zodResolver(numericSchema),
    defaultValues: {
      resultNumericCD4: appt.labResult.resultNumericCD4,
      resultNumericViralLoad: appt.labResult.resultNumericViralLoad,
      conclusion: "",
      note: "",
    },
  });

  const { mutate: updateNumericResults, isPending } = useMutation<
    void,
    Error,
    NumericValues
  >({
    mutationFn: async (data: NumericValues) =>
      await axios.put(`/api/lab-samples/${appt.labSampleId}/results`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      toast.success("Cập nhật kết quả thành công!");
    },
    onError: (err) => {
      const msg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : err.message;
      toast.error(msg);
    },
  });

  const onSubmit = (values: NumericValues) => {
    updateNumericResults(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="resultNumericCD4"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chỉ số CD4</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="resultNumericViralLoad"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tải lượng virus</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="conclusion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kết luận</FormLabel>
              <FormControl>
                <Textarea
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Nhập kết luận"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ghi chú (nếu có)</FormLabel>
              <FormControl>
                <Textarea
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  placeholder="Nhập ghi chú"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          variant="outline"
          className={cn(
            "w-full cursor-pointer bg-green-500 hover:bg-green-600 text-white hover:text-white",
            isPending ? " cursor-now-allowed bg-gray-400" : ""
          )}
          type="submit"
        >
          {isPending ? "Đang gửi..." : "Gửi kết quả"}
        </Button>
      </form>
    </Form>
  );
}
