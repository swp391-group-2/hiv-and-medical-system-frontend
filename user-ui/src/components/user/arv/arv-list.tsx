import type { PatientPrescriptionItem } from "@/types/prescriptions.type";

export const ArvLabels = () => {
  return (
    <div className="w-full grid grid-cols-7 gap-4 mb-6 px-6 py-4 rounded-2xl  shadow-lg border ">
      <div className="col-span-2 flex items-center ">
        <span className="font-bold text-gray-800 text-sm uppercase tracking-wider">
          Tên Thuốc
        </span>
      </div>
      <div className="flex items-center">
        <span className="font-bold text-gray-800 text-sm uppercase tracking-wider">
          Liều Lượng
        </span>
      </div>
      <div className="flex items-center">
        <span className="font-bold text-gray-800 text-sm uppercase tracking-wider">
          Tần Suất
        </span>
      </div>
      <div className="flex items-center">
        <span className="font-bold text-gray-800 text-sm uppercase tracking-wider">
          Số Lượng
        </span>
      </div>
      <div className="col-span-2 flex items-center">
        <span className="font-bold text-gray-800 text-sm uppercase tracking-wider">
          Mô Tả
        </span>
      </div>
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
    <div className="w-full space-y-3">
      {item.map((med) => (
        <div
          key={med.id}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="grid grid-cols-7 gap-4 items-center">
            <div className="col-span-2">
              <h3 className="font-semibold text-gray-900 text-base">
                {med.medication.name}
              </h3>
            </div>
            <div className="flex items-center">
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {med.dosage}
              </span>
            </div>
            <div className="flex items-center">
              <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                {med.frequency}
              </span>
            </div>
            <div className="flex items-center">
              <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                {med.quantity}
              </span>
            </div>
            <div className="col-span-2">
              <p className="text-gray-600 text-sm leading-relaxed">
                {med.medication.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
