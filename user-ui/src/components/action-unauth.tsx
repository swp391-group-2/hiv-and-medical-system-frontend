import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { AppRoutes } from "@/constants/appRoutes";

function ActionUnAuth() {
  return (
    <div className="flex gap-1.5">
      <Button variant="outline">
        <Link to={AppRoutes.LOGIN}>Đăng Nhập</Link>
      </Button>
      <Button variant="primary">
        <Link to={AppRoutes.REGISTER}>Đăng Ký</Link>
      </Button>
    </div>
  );
}

export default ActionUnAuth;
