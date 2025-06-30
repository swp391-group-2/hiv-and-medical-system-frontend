import { useMedications } from "@/api/arv";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type MedicineSelectProps = {
  value?: number;
  onValueChange: (value: number) => void;
};

export const MedicineSelect = ({
  value,
  onValueChange,
}: MedicineSelectProps) => {
  const { data: medicineList = [] } = useMedications();

  return (
    <Select
      value={value?.toString()}
      onValueChange={(val) => {
        const selectedId = Number(val);
        onValueChange(selectedId);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Chọn thuốc" />
      </SelectTrigger>
      <SelectContent className="h-[200px]">
        {medicineList.map((item) => (
          <SelectItem
            key={item.medicationId}
            value={item.medicationId.toString()}
          >
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
