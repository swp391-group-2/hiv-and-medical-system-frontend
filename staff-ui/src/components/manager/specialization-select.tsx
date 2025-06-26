import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { Doctor } from "@/types/doctor";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import type { Specialization } from "@/types/doctor";

export const options: Specialization[] = [
  {
    id: "infectious",
    name: "Chuyên khoa Truyền nhiễm",
  },
  {
    id: "internal",
    name: "Chuyên khoa Nội tổng quát",
  },
  {
    id: "tropical",
    name: "Chuyên khoa Y học nhiệt đới",
  },
  {
    id: "pediatric-infectious",
    name: "Chuyên khoa Nhi - Truyền nhiễm nhi",
  },
  {
    id: "immunology",
    name: "Chuyên khoa Miễn dịch học",
  },
  {
    id: "public-health-epidemiology",
    name: "Chuyên khoa Y tế công cộng - Dịch tễ học",
  },
  {
    id: "obstetrics-gynecology",
    name: "Chuyên khoa Phụ sản",
  },
  {
    id: "dermatology",
    name: "Chuyên khoa Da liễu",
  },
  {
    id: "neurology",
    name: "Chuyên khoa Thần kinh",
  },
  {
    id: "hematology",
    name: "Chuyên khoa Huyết học",
  },
];

interface SpecializationSelectProps<
  T extends FieldValues,
  TName extends Path<T>
> {
  field: ControllerRenderProps<T, TName>;
  doctor?: Doctor;
  options: Specialization[];
}

export const SpecializationSelect = <
  T extends FieldValues,
  TName extends Path<T>
>({
  field,
  doctor,
  options,
}: SpecializationSelectProps<T, TName>) => {
  return (
    <Select
      value={field.value ?? doctor?.specialization ?? ""}
      onValueChange={(val) => field.onChange(val)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Chọn chuyên khoa" />
      </SelectTrigger>
      <SelectContent>
        {options.map((item) => (
          <SelectItem value={item.id}>{item.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
