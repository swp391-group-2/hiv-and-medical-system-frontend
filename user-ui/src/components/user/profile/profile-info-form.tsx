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

export type UserProfileValues = {
  patientId: string;
  userId: string;
  email: string;
  fullName: string;
  userStatus: string;
  patientCode: string;
  dob: string;
  gender: string;
  address: string;
  phoneNumber: string;
  identificationCard: string;
  healthInsurance: string;
  occupation: string;
};

const profileSchema = z.object({
  fullName: z.string().min(1, { message: "Họ và tên không được để trống" }),
  gender: z.string().min(1, { message: "Vui lòng chọn giới tính" }),
  dob: z.string().refine(
    (val) => {
      // Simple check: must match YYYY-MM-DD or DD/MM/YYYY
      // If using <Input type="date" />, the browser provides "YYYY-MM-DD"
      return /^\d{4}-\d{2}-\d{2}$/.test(val);
    },
    { message: "Ngày sinh không hợp lệ (YYYY-MM-DD)" }
  ),
  identificationCard: z
    .string()
    .min(8, { message: "Số CCCD/CMND không được để trống" }),
  healthInsurance: z
    .string()
    .min(8, { message: "Số BHYT không được để trống" }),
  occupation: z.string().min(1, { message: "Vui lòng chọn nghề nghiệp" }),
  phoneNumber: z.string().regex(/^0\d{9}$/, "Số điện thoại không hợp lệ"),
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
      gender: defaultValues?.gender ?? "Không xác định",
      dob: defaultValues?.dob ?? "", // "YYYY-MM-DD"
      identificationCard: defaultValues?.identificationCard ?? "",
      healthInsurance: defaultValues?.healthInsurance ?? "",
      phoneNumber: defaultValues?.phoneNumber ?? "",
      province: defaultValues?.province ?? "",
      district: defaultValues?.district ?? "",
      ward: defaultValues?.ward ?? "",
      street: defaultValues?.street ?? "",
      occupation: defaultValues?.occupation ?? "",
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
            phoneNumber: values.phoneNumber,
            identificationCard: values.identificationCard,
            healthInsurance: values.healthInsurance,
            occupation: values.occupation,
          };
          onSubmit(updateValues);
        })}
        className="space-y-8 w-full"
      >
        {/* —————— SECTION: Thông Tin Chung —————— */}
        <div className="space-y-4">
          <h2 className="text-xl  text-primary font-bold border-b border-gray-200 pb-2 mb-4">
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
                        <SelectValue placeholder="Chọn Giới Tính" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Nam">Nam</SelectItem>
                        <SelectItem value="Nữ">Nữ</SelectItem>
                        <SelectItem value="Không xác định">
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
            <FormField
              control={form.control}
              name="identificationCard"
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

            <FormField
              control={form.control}
              name="healthInsurance"
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
                        <SelectItem value="Học sinh/Sinh viên">
                          Học sinh/Sinh viên
                        </SelectItem>
                        <SelectItem value="Giáo viên">Giáo viên</SelectItem>
                        <SelectItem value="Kỹ sư">Kỹ sư</SelectItem>
                        <SelectItem value="Họa sĩ">Kỹ sư</SelectItem>
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
              name="phoneNumber"
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

        <div className="space-y-4">
          <h2 className="text-xl  text-primary font-bold border-b border-gray-200 pb-2 mb-4">
            Địa Chỉ Theo CCCD
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                        <SelectItem value="Hồ Chí Minh">Hồ Chí Minh</SelectItem>
                        <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
                        <SelectItem value="Chưa Rõ">Khác</SelectItem>
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
                        <SelectItem value="Quận 1">Quận 1</SelectItem>
                        <SelectItem value="Quận 2">Quận 3</SelectItem>
                        <SelectItem value="Quận 3">Quận 5</SelectItem>
                        <SelectItem value="Quận Thủ Đức">
                          Quận Thủ Đức
                        </SelectItem>
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
                        <SelectItem value="Phường 1">Phường 1</SelectItem>
                        <SelectItem value="Phường 2">Phường 3</SelectItem>
                        <SelectItem value="Phường 3">Phường 5</SelectItem>
                        <SelectItem value="Phường Long Thạnh Mỹ">
                          Phường Long Thạnh Mỹ
                        </SelectItem>
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
          <Button type="submit">Lưu thông tin hồ sơ</Button>
        </div>
      </form>
    </Form>
  );
}
