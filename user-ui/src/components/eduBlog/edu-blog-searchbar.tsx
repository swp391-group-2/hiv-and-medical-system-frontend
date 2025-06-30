import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EduBlogSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const EduBlogSearchBar = ({
  value,
  onChange,
  placeholder = "Tìm kiếm bài viết...",
}: EduBlogSearchBarProps) => {
  return (
    <form className="flex w-full max-w-md items-center space-x-2">
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
      <Button type="submit" size="sm">
        Tìm kiếm
      </Button>
    </form>
  );
};
