import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

const LogoutBtn = ({
  className,
  handleLogout,
}: {
  className: string;
  handleLogout: () => void;
}) => {
  return (
    <Button onClick={handleLogout} variant="destructive" className={className}>
      <LogOut />
      Đăng xuất
    </Button>
  );
};
export default LogoutBtn;
