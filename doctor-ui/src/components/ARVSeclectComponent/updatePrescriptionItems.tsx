import React, { useState, useEffect } from "react";
import type { Prescription, PrescriptionItem } from "@/types/prescription";
import { updatePrescriptionItem } from "@/api/doctorChonPhacDo";
import BasicModal from "../Modal/basicModal";
import { Pill, PillBottle } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prescription: Prescription;
  appointmentId: number;
  onUpdated?: () => void;
}

const UpdatePrescriptionItemsModal: React.FC<Props> = ({
  open,
  onOpenChange,
  prescription,
  appointmentId,
  onUpdated,
}) => {
  const [items, setItems] = useState<PrescriptionItem[]>(
    prescription.prescriptionItems
  );

  useEffect(() => {
    if (open) {
      setItems(prescription.prescriptionItems);
    }
  }, [open, prescription.prescriptionItems]);

  const handleChange = (
    idx: number,
    field: keyof PrescriptionItem,
    value: string
  ) => {
    setItems((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item))
    );
  };

  const handleSave = async () => {
    try {
      await updatePrescriptionItem(
        appointmentId,
        prescription.prescriptionId,
        items
      );
      alert("Cập nhật thuốc thành công!");
      onOpenChange(false);
      onUpdated?.();
    } catch (err) {
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <BasicModal open={open} onClose={() => onOpenChange(false)}>
      <h2 className="text-2xl font-bold mb-6 text-blue-700">
        Cập nhật thuốc trong phác đồ
      </h2>

      <div className="space-y-6">
        {items.map((item, idx) => (
          <div
            key={item.prescriptionItemId}
            className="border border-gray-200 rounded-xl p-4 shadow-sm"
          >
            <div className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Pill /> Thuốc: {item.medication.name}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Liều dùng
                </label>
                <input
                  type="text"
                  value={item.dosage}
                  onChange={(e) => handleChange(idx, "dosage", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Tần suất
                </label>
                <input
                  type="text"
                  value={item.frequency}
                  onChange={(e) =>
                    handleChange(idx, "frequency", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Thời gian (ngày)
                </label>
                <input
                  type="text"
                  value={item.duration}
                  onChange={(e) =>
                    handleChange(idx, "duration", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Số lượng (viên)
                </label>
                <input
                  type="number"
                  min={0}
                  value={item.quantity || ""}
                  onChange={(e) =>
                    handleChange(idx, "quantity", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <button
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          onClick={() => onOpenChange(false)}
        >
          Hủy
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
          onClick={handleSave}
        >
          Xác nhận chọn phác đồ
        </button>
      </div>
    </BasicModal>
  );
};

export default UpdatePrescriptionItemsModal;
