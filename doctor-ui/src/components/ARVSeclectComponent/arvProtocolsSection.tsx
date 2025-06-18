import type { Prescription } from "@/types/prescription";
import PrescriptionCard from "./arvProtocolCard";

const PrescriptionList = ({
  prescriptions,
  onSelect,
  selectedPrescriptionId,
}: {
  prescriptions: Prescription[];
  onSelect: (prescription: Prescription) => void;
  selectedPrescriptionId: number | null;
}) => {
  if (!prescriptions || prescriptions.length === 0) {
    return <p className="text-sm text-gray-500">Không có phác đồ ARV nào.</p>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Danh sách phác đồ ARV</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prescriptions.map((pres, index) => {
          if (
            !pres ||
            typeof pres.prescriptionId !== "number" ||
            !pres.name ||
            !Array.isArray(pres.prescriptionItems)
          ) {
            return (
              <div
                key={`invalid-${index}`}
                className="p-3 border border-red-300 text-red-500 rounded"
              >
                ⚠️ Phác đồ không hợp lệ hoặc thiếu dữ liệu.
              </div>
            );
          }

          return (
            <PrescriptionCard
              key={pres.prescriptionId}
              prescription={pres}
              onClick={() => onSelect(pres)}
              selected={pres.prescriptionId === selectedPrescriptionId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PrescriptionList;
