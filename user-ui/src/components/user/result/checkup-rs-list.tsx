import type { AppointmentCompletedEntry } from "@/types/appointment.type";
import { CheckUpRsItem } from "./checkup-rs-item";
import { GenericList } from "./common";
const CheckUpRsLabels = () => {
  return (
    <p>
      <div className="w-full grid grid-cols-9 mt-6 mb-4 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
        <span className="font-semibold col-span-1 text-gray-700 text-sm uppercase tracking-wide">
          Mã số
        </span>
        <span className="font-semibold col-span-2 text-gray-700 text-sm uppercase tracking-wide">
          Bác sĩ Phụ Trách
        </span>
        <span className="font-semibold col-span-3 text-gray-700 text-sm uppercase tracking-wide">
          Phác Đồ Đã Chọn
        </span>
        <span className="font-semibold col-span-2 text-gray-700 text-sm uppercase tracking-wide">
          Thời Gian Khám
        </span>
        <span className="font-semibold col-span-1 text-gray-700 text-sm uppercase tracking-wide">
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
