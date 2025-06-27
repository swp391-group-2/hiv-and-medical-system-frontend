import type { AppointmentCompletedEntry } from "@/types/appointment.type";
import { CheckUpRsItem } from "./checkup-rs-item";
import { GenericList } from "./common";
const CheckUpRsLabels = () => {
  return (
    <p>
      <div className="w-full grid grid-cols-9 gap-4 mb-6 px-6 py-4 rounded-2xl  shadow-lg border ">
        <span className="font-bold col-span-1  text-gray-800 text-sm uppercase tracking-wider">
          Mã số
        </span>
        <span className="font-bold col-span-2 text-gray-800 text-sm uppercase tracking-wider">
          Bác sĩ Phụ Trách
        </span>
        <span className="font-bold col-span-3 text-gray-800 text-sm uppercase tracking-wider">
          Phác Đồ Đã Chọn
        </span>
        <span className="font-bold col-span-2  text-center text-gray-800 text-sm uppercase tracking-wider">
          Thời Gian Khám
        </span>
        <span className="font-bold  col-span-1 text-center text-gray-800 text-sm uppercase tracking-wider">
          Thao Tác
        </span>
      </div>
    </p>
  );
};

const CheckUpResultList = ({ list }: { list: AppointmentCompletedEntry[] }) => {
  return (
    <GenericList<AppointmentCompletedEntry>
      items={list}
      header={<CheckUpRsLabels />}
      renderItem={(item) => (
        <CheckUpRsItem key={item.appointmentId} item={item} />
      )}
    />
  );
};

export default CheckUpResultList;
