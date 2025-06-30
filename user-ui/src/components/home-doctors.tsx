import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import ListTopDoctor from "./list-top-doctor";
import { Link } from "react-router-dom";
import { AppRoutes } from "@/constants/appRoutes";

function HomeDoctors() {
  return (
    <section>
      <div className="container mx-auto px-4 py-8">
        <div className="header text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Đặt lịch với bác sĩ
          </h2>
          <p className="text-lg text-muted-foreground">
            Tìm kiếm và kết nối với các bác sĩ chuyên nghiệp
          </p>
        </div>
        <div className="mb-10">
          <ListTopDoctor />
        </div>

        <div className="actions text-center ">
          <Link to={AppRoutes.CONSULTATION_DOCTORS}>
            <Button size="lg">
              <Users className="mr-2 h-4 w-4" />
              Xem tất cả bác sĩ
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomeDoctors;
