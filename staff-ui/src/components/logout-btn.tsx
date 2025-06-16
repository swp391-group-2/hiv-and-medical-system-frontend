import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

const LogoutBtn = ({ className }: { className: string }) => {
  return (
    <Button variant="destructive" className={className}>
      <LogOut />
      Đăng xuất
    </Button>
  );
};
export default LogoutBtn;
