import { Button } from "@/components/ui/button";
import { AppRoutes } from "@/constants/appRoutes";
import { Ticket, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TicketCardProps {
  ticketType: "CONSULTATION" | "SCREENING" | "CONFIRMATORY";
  serviceName: string;
  count: number;
  price?: number;
  image?: string;
}

function TicketCard({
  serviceName,
  count,
  price,
  image,
  ticketType,
}: TicketCardProps) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(
      ticketType === "CONSULTATION"
        ? AppRoutes.CONSULTATION_DOCTORS
        : ticketType === "SCREENING"
        ? AppRoutes.SCREENING
        : AppRoutes.CONFIRMATORY
    );
  };

  const defaultPrice = 400000;

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 w-full max-w-4xl mx-auto">
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-6 h-6 bg-gray-100 rounded-full -translate-x-3 border-4 border-white"></div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-6 h-6 bg-gray-100 rounded-full translate-x-3 border-4 border-white"></div>

      <div className="absolute top-6 bottom-6 left-1/2 transform -translate-x-1/2 border-l-2 border-dashed border-gray-300"></div>

      <div className="flex">
        <div className="flex-1 p-8 pr-10 flex items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100 flex-shrink-0">
            <img
              src={image}
              alt={serviceName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {serviceName}
            </h3>
            <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
              <Ticket className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-600">Số lượng:</span>
              <span className="text-base font-bold text-blue-600">{count}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-8 pl-6 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col justify-center">
          <div className="text-center mb-6">
            <span className="text-3xl font-bold text-green-600">
              {(price || defaultPrice).toLocaleString("vi-VN")}đ
            </span>
            <span className="text-sm text-gray-500 block">/ vé</span>
          </div>

          <Button
            disabled={count <= 0}
            onClick={handleClick}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]"
          >
            <span className="flex items-center justify-center gap-2">
              Sử dụng vé ngay
              <ArrowRight className="w-5 h-5" />
            </span>
          </Button>
        </div>
      </div>

      <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-20"></div>
    </div>
  );
}

export default TicketCard;
