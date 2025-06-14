import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";

function HomeDoctors() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="header text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-3">
          Đặt lịch với bác sĩ
        </h2>
        <p className="text-lg text-muted-foreground">
          Tìm kiếm và kết nối với các bác sĩ chuyên nghiệp
        </p>
      </div>
      <div className="grid-cols-4 grid gap-5"></div>

      <div className="actions text-center">
        <Button size="lg">
          <Users className="mr-2 h-4 w-4" />
          Xem tất cả bác sĩ
        </Button>
      </div>
    </div>
  );
}

export default HomeDoctors;
