// src/components/TestHeader.tsx
import {
  AlarmClockCheck,
  CircleDollarSign,
  Clock3,
  ShieldUser,
} from "lucide-react";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router-dom";

interface TestHeaderProps {
  title: string;
  price: string;
  image: string;
  resultTime: string;
  notes: string[];
}

const TestHeader: React.FC<TestHeaderProps> = ({
  title,
  price,
  image,
  resultTime,
  notes,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = () => {
    if (location.pathname.includes("confirmatorytest")) {
      navigate("/services/booking/confirmatorytest");
    } else if (location.pathname.includes("screeningtest")) {
      navigate("/services/booking/screeningtest");
    }
  };
  return (
    <div className="flex flex-col md:flex-row gap-8 bg-blue-100 rounded-2xl p-8 mb-6">
      <div className="flex flex-col items-center md:w-1/3">
        <img
          src={image}
          alt="Bác sĩ"
          className="w-100 h-60 object-cover rounded-xl mb-6 bg-white"
        />
        <Button
          className=" font-semibold rounded-lg px-8 py-3 text-base"
          onClick={handleClick}
        >
          Đặt Lịch Xét Nghiệm Ngay
        </Button>
      </div>
      <div className="flex-1 flex flex-col justify-start items-start space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4">
          {title}
        </h1>
        <ul className="space-y-3 text-base">
          <li className="flex items-center gap-2">
            <span className="text-lg">
              <ShieldUser />
            </span>
            {notes[0]}
          </li>
          <li className="flex items-center gap-2">
            <span className="text-lg">
              <Clock3 />
            </span>
            {resultTime}
          </li>
          <li className="flex items-center gap-2">
            <span className="text-lg">
              <AlarmClockCheck />
            </span>
            {notes[1]}
          </li>
          <li className="flex items-center gap-2">
            <span className="text-lg">
              <CircleDollarSign />
            </span>
            Giá Chỉ: <span className="text-blue-600 font-bold">{price}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TestHeader;
