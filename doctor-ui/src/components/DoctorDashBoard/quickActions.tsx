import { type FC } from "react";
import { SquareChartGantt, Users } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Thêm dòng này

const QuickActions: FC = () => {
  const navigate = useNavigate(); // Thêm dòng này

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold mb-4">📈 Thao tác nhanh</h2>
      <div className="space-y-4">
        {/* <div
          className="p-4 rounded-lg bg-blue-50 cursor-pointer hover:bg-blue-100"
          onClick={() => navigate("/doctor/schedule")}
        >
          <div className="flex items-center space-x-2 text-blue-700 font-medium">
            <CalendarDays size={18} />
            <span>Xem lịch hôm nay</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Kiểm tra lịch khám bệnh hôm nay
          </p>
        </div> */}
        <div
          className="p-4 rounded-lg bg-blue-50 cursor-pointer hover:bg-blue-100"
          onClick={() => navigate("/doctor/pending")}
        >
          <div className="flex items-center space-x-2 text-blue-700 font-medium">
            <Users size={18} />
            <span>Xem bệnh nhân chờ khám</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Kiểm tra danh sách bệnh nhân đang chờ khám
          </p>
        </div>
        <div
          className="p-4 rounded-lg bg-green-50 cursor-pointer hover:bg-green-100"
          onClick={() => navigate("/doctor/completed")}
        >
          <div className="flex items-center space-x-2 text-green-700 font-medium">
            <SquareChartGantt size={18} />
            <span>Quản lý bệnh nhân</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Kiểm tra danh sách bệnh nhân và lịch sử khám
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
