import type { PatientPrescriptionItem } from "@/types/prescriptions.type";

export const ArvLabels = () => {
  return (
    <div className="w-full grid grid-cols-7 mt-6 mb-4 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
      <span className="font-semibold col-span-2 text-gray-700 text-sm uppercase tracking-wide">
        Tên Thuốc
      </span>
      <span className="font-semibold col-span-1 text-gray-700 text-sm uppercase tracking-wide">
        Liều Lượng
      </span>
      <span className="font-semibold col-span-1 text-gray-700 text-sm uppercase tracking-wide">
        Số Lượng
      </span>
      <span className="font-semibold col-span-1 text-gray-700 text-sm uppercase tracking-wide">
        Tông Số
      </span>
      <span className="font-semibold col-span-2 text-gray-700 text-sm uppercase tracking-wide">
        Ghi Chú
      </span>
    </div>
  );
};

export const ArvItem = ({ item }: { item: PatientPrescriptionItem[] }) => {
  if (!item || item.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-gray-100 rounded-full p-4 mb-4">
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Chưa có đơn thuốc
        </h3>
        <p className="text-gray-500 text-center max-w-sm">
          Hiện tại bạn chưa có đơn thuốc nào được kê. Vui lòng liên hệ bác sĩ để
          được tư vấn.
        </p>
      </div>
    );
  }

  return (
    <ul className="w-full border border-gray-300 p-4 rounded">
      {item.map((med) => (
        <li
          key={med.id}
          className="w-full grid grid-cols-7  border-b last:border-b-0 pt-4 pb-4 first:pt-0 last:pb-0"
        >
          <span className="col-span-2">{med.medication.name}</span>
          <span>{med.dosage}</span>
          <span>{med.frequency}</span>
          <span>{med.quantity}</span>
          <span className="col-span-2">{med.medication.description}</span>
        </li>
      ))}
    </ul>
  );
};
