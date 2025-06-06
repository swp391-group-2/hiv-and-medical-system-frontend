import type { AppointmentInfo } from "./appointments-tabs";
import { formatDMY } from "@/lib/utils";

interface AppointmentsListProps {
  list: AppointmentInfo[];
}

export const AppointmentLabels = () => {
  return (
    <li className="text-gray-500 w-full grid grid-cols-5 mt-5 mb-5">
      <span>Mã số</span>
      <span>Bác sĩ phụ trách</span>
      <span>Loại dịch vụ</span>
      <span>Ngày khám</span>
      <span>Giờ khám</span>
    </li>
  );
};

const AppointmentItem = ({ item }: { item: AppointmentInfo }) => {
  return (
    <li className="w-full grid grid-cols-5 border-b last:border-b-0 pt-4 pb-4 first:pt-0 last:pb-0">
      <span>{item.id}</span>
      <span>{item.doctor}</span>
      <span>{item.type}</span>
      <span>{formatDMY(item.date.toISOString())}</span>
      <span>{item.time.duration}</span>
    </li>
  );
};

export const AppointmentsList: React.FC<AppointmentsListProps> = ({ list }) => {
  return (
    <ul className="w-full border border-gray-400 p-4 rounded">
      {list.map((item) => (
        <AppointmentItem item={item} />
      ))}
    </ul>
  );
};
