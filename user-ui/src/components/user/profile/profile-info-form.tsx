import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { UserProfileUpdateValues } from "@/types/userProfile.type";

const profileSchema = z.object({
  fullName: z.string().min(1, { message: "Họ và tên không được để trống" }),
  gender: z.enum(["male", "female", "unspecified"], {
    errorMap: () => ({ message: "Vui lòng chọn giới tính" }),
  }),
  dob: z.string().refine(
    (val) => {
      // Simple check: must match YYYY-MM-DD or DD/MM/YYYY
      // If using <Input type="date" />, the browser provides "YYYY-MM-DD"
      return /^\d{4}-\d{2}-\d{2}$/.test(val);
    },
    { message: "Ngày sinh không hợp lệ (YYYY-MM-DD)" }
  ),
  idNumber: z.string().min(8, { message: "Số CCCD/CMND không được để trống" }),
  insuranceNumber: z
    .string()
    .min(8, { message: "Số BHYT không được để trống" }),
  occupation: z.string().min(1, { message: "Vui lòng chọn nghề nghiệp" }),
  phone: z.string().regex(/^0\d{9}$/, "Số điện thoại không hợp lệ"),
  province: z.string().min(1, { message: "Vui lòng chọn tỉnh/thành phố" }),
  district: z.string().min(1, { message: "Vui lòng chọn quận/huyện" }),
  ward: z.string().min(1, { message: "Vui lòng chọn phường/xã" }),
  street: z
    .string()
    .min(1, { message: "Số nhà/tên đường/ấp, thôn không được để trống" }),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileInfoFormProps {
  defaultValues?: Partial<ProfileFormValues>;
  onSubmit: (values: UserProfileUpdateValues) => void;
}

export function ProfileInfoForm({
  defaultValues,
  onSubmit,
}: ProfileInfoFormProps) {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: defaultValues?.fullName ?? "",
      gender: defaultValues?.gender ?? "unspecified",
      dob: defaultValues?.dob ?? "", // "YYYY-MM-DD"
      idNumber: defaultValues?.idNumber ?? "",
      insuranceNumber: defaultValues?.insuranceNumber ?? "",
      occupation: defaultValues?.occupation ?? "",
      phone: defaultValues?.phone ?? "",
      province: defaultValues?.province ?? "",
      district: defaultValues?.district ?? "",
      ward: defaultValues?.ward ?? "",
      street: defaultValues?.street ?? "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          // Transform ProfileFormValues to UserProfileUpdateValues
          const updateValues: UserProfileUpdateValues = {
            fullName: values.fullName,
            dob: values.dob,
            gender: values.gender,
            address: `${values.street}, ${values.ward}, ${values.district}, ${values.province}`,
            phoneNumber: values.phone,
            identificationCard: values.idNumber,
            healthInsurance: values.insuranceNumber,
            occupation: values.occupation,
          };
          onSubmit(updateValues);
        })}
        className="space-y-8 w-full"
      >
        {/* —————— SECTION: Thông Tin Chung —————— */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-teal-600">
            Thông Tin Chung
          </h2>

          {/* Full Name */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="flex-2/4">
                  <FormLabel>
                    Họ và tên&nbsp;<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập họ và tên" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender Select */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="flex-1/4">
                  <FormLabel>
                    Giới tính&nbsp;<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder="Chọn giới tính" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Nam</SelectItem>
                        <SelectItem value="female">Nữ</SelectItem>
                        <SelectItem value="unspecified">
                          Không xác định
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Date of Birth */}
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex-1/4">
                  <FormLabel>
                    Ngày tháng năm sinh&nbsp;
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    {/* If you have a custom Calendar/DatePicker component, swap this out.
                      Here we fall back to a browser-native <input type="date" />. */}
                    <Input type="date" placeholder="YYYY-MM-DD" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Số CCCD/CMND */}
            <FormField
              control={form.control}
              name="idNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Số CCCD/CMND&nbsp;<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập số CCCD/CMND" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Số BHYT */}
            <FormField
              control={form.control}
              name="insuranceNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số BHYT</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập số BHYT" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Ngành nghề */}
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nghề nghiệp&nbsp;<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder="Chọn nghề nghiệp" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* Replace these with actual occupations */}
                        <SelectItem value="student">
                          Học sinh/Sinh viên
                        </SelectItem>
                        <SelectItem value="teacher">Giáo viên</SelectItem>
                        <SelectItem value="engineer">Kỹ sư</SelectItem>
                        <SelectItem value="other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sđt */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Số điện thoại&nbsp;<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập số điện thoại" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* —————— SECTION: Địa Chỉ Theo CCCD —————— */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-teal-600">
            Địa Chỉ Theo CCCD
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tỉnh/Thành phố */}
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Tỉnh/Thành phố&nbsp;<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder="Chọn Tỉnh, Thành phố" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* Add real province options */}
                        <SelectItem value="hanoi">Hà Nội</SelectItem>
                        <SelectItem value="hochiminh">Hồ Chí Minh</SelectItem>
                        <SelectItem value="danang">Đà Nẵng</SelectItem>
                        <SelectItem value="other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Quận/Huyện * (required) */}
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Quận/Huyện&nbsp;<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder="Chọn quận/huyện" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* These should be filtered based on province in a real app */}
                        <SelectItem value="quan1">Quận 1</SelectItem>
                        <SelectItem value="quan3">Quận 3</SelectItem>
                        <SelectItem value="quan5">Quận 5</SelectItem>
                        <SelectItem value="other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phường/Xã */}
            <FormField
              control={form.control}
              name="ward"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Phường/Xã&nbsp;<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder="Chọn phường/xã" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* These should be filtered based on district in a real app */}
                        <SelectItem value="phuong1">Phường 1</SelectItem>
                        <SelectItem value="phuong3">Phường 3</SelectItem>
                        <SelectItem value="phuong5">Phường 5</SelectItem>
                        <SelectItem value="other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Số nhà/Tên đường/Ấp, thôn */}
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Số nhà/Tên đường/Ấp, thôn&nbsp;
                    <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập số nhà, tên đường, ấp/thôn,…"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* —————— SUBMIT BUTTON —————— */}
        <div className="flex justify-end">
          <Button
            className="bg-blue-500 hover:bg-blue-600 cursor-pointer"
            type="submit"
          >
            Lưu thông tin hồ sơ
          </Button>
        </div>
      </form>
    </Form>
  );
}
