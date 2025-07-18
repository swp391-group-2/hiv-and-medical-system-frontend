import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface PostSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onReload?: () => void;
  setPostOwner: (owner: string) => void;
  postowner: string;
}

const PostSearchBar = ({
  value,
  onChange,
  placeholder = "Tìm Câu Hỏi",
  onReload = () => {},
  setPostOwner,
  postowner,
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
      <Select onValueChange={setPostOwner} value={postowner}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Tất cả" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tất cả</SelectItem>
          <SelectItem value="mine">Của tôi</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={onReload} size="sm">
        Tải Lại
      </Button>
    </div>
  );
};

export default PostSearchBar;
