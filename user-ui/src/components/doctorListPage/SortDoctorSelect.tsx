import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortDoctorSelectProps {
  sortOrder: "desc" | "asc";
  setSortOrder: (order: "desc" | "asc") => void;
}

const SortDoctorSelect: React.FC<SortDoctorSelectProps> = ({ sortOrder, setSortOrder }) => (
  <Select
    value={sortOrder}
    onValueChange={(v) => setSortOrder(v as "desc" | "asc")}
  >
    <SelectTrigger>
      <SelectValue placeholder="Sắp xếp theo rating" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="desc">Rating cao đến thấp</SelectItem>
      <SelectItem value="asc">Rating thấp đến cao</SelectItem>
    </SelectContent>
  </Select>
);

export default SortDoctorSelect;