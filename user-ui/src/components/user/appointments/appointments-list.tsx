import { Button } from "@/components/ui/button";
import type { AppointmentEntry } from "@/types/appointment.type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { Link } from "react-router-dom";

interface AppointmentsListProps {
  list: AppointmentEntry[];
}

export const AppointmentLabels = () => {
  return (
    <div className="w-full grid grid-cols-9 mt-6 mb-4 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
      <span className="font-semibold col-span-1 text-gray-700 text-sm uppercase tracking-wide">
        Mã số
      </span>
      <span className="font-semibold col-span-2 text-gray-700 text-sm uppercase tracking-wide">
        Bác sĩ phụ trách
      </span>
      <span className="font-semibold col-span-2 text-gray-700 text-sm uppercase tracking-wide">
        Loại dịch vụ
      </span>
      <span className="font-semibold col-span-1 text-gray-700 text-sm uppercase tracking-wide">
        Ngày khám
      </span>
      <span className="font-semibold col-span-1 text-gray-700 text-sm uppercase tracking-wide">
        Giờ khám
      </span>
      <span className="font-semibold col-span-2 text-gray-700 text-sm uppercase text-center tracking-wide">
        Thao Tác
      </span>
    </div>
  );
};

const AppointmentItem = ({ item }: { item: AppointmentEntry }) => {
  return (
    <li className="w-full grid grid-cols-9 items-center gap-4 p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200">
      <span className="font-medium text-blue-600 col-span-1 bg-blue-50 px-3 py-1 rounded-full text-sm">
        #{item.appointmentCode}
      </span>
      <span className="text-gray-800 font-medium col-span-2">
        {item.doctorName}
      </span>
      <span className="text-gray-600 bg-gray-100 px-2 py-1 rounded text-sm col-span-2">
        {item.serviceName}
      </span>
      <span className="text-gray-700 font-mono text-sm col-span-1">
        {item.date}
      </span>
      <span className=" font-mono text-sm bg-green-50 text-green-700 px-2 py-1 rounded col-span-1">
        {item.startTime} - {item.endTime}
      </span>

      <span className="flex items-center justify-center col-span-2 space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Ellipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56  shadow-lg" align="center">
            <DropdownMenuItem>
              <Link to="/arv" className="w-full">
                Xem Chi Tiết
              </Link>
            </DropdownMenuItem>
            {item.status === "SCHEDULED" && (
              <DropdownMenuItem>Hủy Lịch</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </span>
    </li>
  );
};

export const AppointmentsList = ({ list }: AppointmentsListProps) => {
  if (list.length === 0) {
    return (
      <div className="w-full border border-gray-200 rounded-xl bg-white shadow-sm">
        <div className="flex flex-col items-center justify-center py-12 px-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Không có lịch hẹn
          </h3>
          <p className="text-gray-500 text-center">
            Bạn chưa có lịch hẹn nào trong danh mục này
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
      <ul className="divide-y divide-gray-100">
        {list.map((item) => (
          <AppointmentItem key={item.appointmentId} item={item} />
        ))}
      </ul>
    </div>
  );
};
