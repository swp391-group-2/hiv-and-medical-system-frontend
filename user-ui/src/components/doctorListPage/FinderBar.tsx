import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FinderBarProps {
  search: string;
  setSearch: (value: string) => void;
}

const FinderBar = ({ search, setSearch }: FinderBarProps) => {
  return (
    <div className="mb-0 w-full flex justify-center items-center">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Tìm bác sĩ"
          className="rounded-2xl shadow-sm pl-10 w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default FinderBar;
