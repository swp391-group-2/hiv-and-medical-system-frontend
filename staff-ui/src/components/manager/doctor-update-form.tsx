import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Doctor } from "@/types/doctor";
import { options, SpecializationSelect } from "./specialization-select";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/api/http";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { Loader2 } from "lucide-react";

// basic schema
const updateDoctorFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "Tên phải có ít nhất một kí tự")
    .max(50, "Tên vượt quá số kí tự cho phép"),
  specialization: z.string().nonempty("Chuyên khoa không được bỏ trống"),
  licenseNumber: z
    .string()
    .nonempty("Số giấy phép hành nghề không được bỏ trống"),
  status: z.boolean(),
});
// image schema
const imageSchema = z.object({ file: z.string().optional() });

// merge schemas
const doctorWithImageSchema = updateDoctorFormSchema.merge(imageSchema);

type UpdateDoctorFormValues = z.infer<typeof updateDoctorFormSchema>;
type Image = z.infer<typeof imageSchema>;
type UpdateDoctorFormWithImageValues = UpdateDoctorFormValues & Image;

export function DoctorUpdateForm({ doctor }: { doctor: Doctor }) {
  const queryClient = useQueryClient();

  const form = useForm<UpdateDoctorFormWithImageValues>({
    resolver: zodResolver(doctorWithImageSchema),
    defaultValues: {
      fullName: doctor.fullName,
      specialization: doctor.specialization,
      licenseNumber: doctor.licenseNumber,
      file: "",
      status: doctor.userStatus === "active" ? true : false,
    },
  });

  const { mutate: updateBasicInfo, isPending } = useMutation<
    void,
    AxiosError,
    UpdateDoctorFormValues
  >({
    mutationFn: async (values) =>
      await http.put(`/doctors/${doctor.doctorId}`, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      toast.success("Cập nhật thành công!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { mutate: updateImage } = useMutation<void, AxiosError, string>({
    mutationFn: async (image) => {
      await http.put(`/doctors/${doctor.doctorId}/upload`, image);
    },
    onSuccess: () => {
      toast.success("Cập nhật hình thành công.");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (values: UpdateDoctorFormWithImageValues) => {
    const { file, ...basic } = values;
    updateBasicInfo(basic);
    if (values.file) {
      updateImage(values.file);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* fullName */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và tên</FormLabel>
              <FormControl>
                <Input type="text" placeholder={doctor.fullName} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* spec */}
        <FormField
          control={form.control}
          name="specialization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chuyên khoa</FormLabel>
              <FormControl>
                <SpecializationSelect
                  field={field}
                  doctor={doctor}
                  options={options}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* license */}
        <FormField
          control={form.control}
          name="licenseNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số giấy phép hành nghề</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder={doctor.licenseNumber}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* image */}
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="file">Ảnh đại diện</FormLabel>
              <FormControl>
                <Input
                  className="cursor-pointer"
                  id="file"
                  placeholder="Chọn file"
                  type="file"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* status */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex justify-between items-center">
              <FormLabel>Trạng thái tài khoản</FormLabel>
              <FormControl>
                <div className="flex gap-3">
                  <Label
                    className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-semibold",
                      field.value ? "text-green-500" : "text-red-600"
                    )}
                  >
                    {field.value ? "Đang hoạt động" : "Đã vô hiệu hoá"}
                  </Label>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={cn(
                      field.value
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600",
                      "h-6 w-11 rounded-full transition-colors"
                    )}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* submit */}
        <Button
          variant="outline"
          disabled={isPending}
          className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white hover:text-white"
          type="submit"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang tạo...
            </>
          ) : (
            "Cập nhật"
          )}
        </Button>
      </form>
    </Form>
  );
}
