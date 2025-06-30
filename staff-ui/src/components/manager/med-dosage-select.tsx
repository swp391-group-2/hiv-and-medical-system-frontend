import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export const MedicineDosageSelect = ({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) => {
  return (
    <Select value={value} onValueChange={(val) => onValueChange(val)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Chọn liều lượng uống" />
      </SelectTrigger>
      <SelectContent className="h-[200px]">
        {[...Array(9)].map((_, i) => (
          <SelectItem key={i} value={`${50 * (i + 1)} mg`}>
            {50 * (i + 1)} mg
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
