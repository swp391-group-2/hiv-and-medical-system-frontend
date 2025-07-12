import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PostSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onReload?: () => void;
}

const PostSearchBar = ({
  value,
  onChange,
  placeholder = "Tìm Câu Hỏi",
  onReload = () => {},
}: PostSearchBarProps) => {
  return (
    <div className="flex w-full max-w-md items-center space-x-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button onClick={onReload} size="sm">
        Tải Lại
      </Button>
    </div>
  );
};

export default PostSearchBar;
