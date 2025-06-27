import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export const MedicineFrequencySelect = ({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) => {
  return (
    <Select value={value} onValueChange={(val) => onValueChange(val)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Chọn tần suất uống" />
      </SelectTrigger>
      <SelectContent className="h-[200px]">
        <SelectItem value="1 lần/ngày">1 lần/ngày</SelectItem>
        <SelectItem value="2 lần/ngày">2 lần/ngày</SelectItem>
        <SelectItem value="3 lần/ngày">3 lần/ngày</SelectItem>
        <SelectItem value="4 lần/ngày">4 lần/ngày</SelectItem>
        <SelectItem value="5 lần/ngày">5 lần/ngày</SelectItem>
        <SelectItem value="6 lần/ngày">6 lần/ngày</SelectItem>
        <SelectItem value="7 lần/ngày">7 lần/ngày</SelectItem>
        <SelectItem value="8 lần/ngày">8 lần/ngày</SelectItem>
        <SelectItem value="9 lần/ngày">9 lần/ngày</SelectItem>
        <SelectItem value="10 lần/ngày">10 lần/ngày</SelectItem>
        <SelectItem value="11 lần/ngày">11 lần/ngày</SelectItem>
      </SelectContent>
    </Select>
  );
};
