import { useMedications } from "@/api/arv";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { LoadingOverlay } from "../loading-overlay";

type MedicineSelectProps = {
  value?: number;
  onValueChange: (value: number) => void;
};

export const MedicineSelect = ({
  value,
  onValueChange,
}: MedicineSelectProps) => {
  const { data: medicineList = [], isLoading } = useMedications();

  if (isLoading) return <LoadingOverlay message="Đang tải danh sách" />;
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
      <SelectContent>
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
