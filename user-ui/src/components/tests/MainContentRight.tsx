import { buildRoute } from "@/constants/appRoutes";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router-dom";

interface MainContentRightProps {
  price: string;
  image: string;
}

const MainContentRight = ({ price, image }: MainContentRightProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBookingClick = () => {
    navigate(buildRoute.bookingService(location.pathname.split("/")[1] || ""));
  };

  return (
    <div className="lg:w-1/3 flex flex-col items-center">
      <div className="bg-gradient-to-br from-primary/70 to-sky-100 rounded-3xl w-full flex flex-col items-center p-8 shadow-xl border border-sky-200/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 backdrop-blur-sm">
        <div className="relative mb-8 group">
          <div className="absolute -inset-2 bg-gradient-to-r from-sky-400 to-sky-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          <img
            src={image}
            alt="Phòng xét nghiệm"
            className="relative w-full max-w-xs rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="text-center mb-8">
          <div className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent mb-3">
            Giá Chỉ <span className="text-emerald-500">{price}</span>
          </div>
          <p className="text-sky-600 text-sm font-medium opacity-80">
            Xét nghiệm chính xác, nhanh chóng
          </p>
        </div>

        <Button
          onClick={handleBookingClick}
          className="bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 hover:from-sky-500 hover:via-sky-600 hover:to-sky-700 text-white font-bold rounded-2xl px-10 py-5 text-base shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 w-full max-w-xs border border-sky-300/30 backdrop-blur-sm"
        >
          <span className="flex items-center justify-center gap-3">
            <span className="bg-gradient-to-r from-white to-sky-50 bg-clip-text text-transparent font-bold">
              Đặt Lịch Xét Nghiệm Ngay
            </span>
          </span>
        </Button>
      </div>
    </div>
  );
};

export default MainContentRight;
