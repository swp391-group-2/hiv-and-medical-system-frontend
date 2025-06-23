import React, { useState, useEffect } from "react";
import type {
  patientPrescription,
  patientPrescriptionItems,
} from "@/types/prescription";
import { updatePrescriptionItem } from "@/api/doctorChonPhacDo";
import BasicModal from "../Modal/basicModal";
import { Pill } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prescription: patientPrescription;
  appointmentId: number;
  onUpdated?: () => void;
}

const frequencyOptions = [
  "1 lần/ngày",
  "2 lần/ngày",
  "3 lần/ngày",
  "1 lần/tuần",
];

const pillsPerDoseOptions = [1, 2, 3, 4, 5];

const parseFrequency = (frequency: string): number => {
  const lower = frequency.toLowerCase();
  if (lower.includes("1 lần/ngày")) return 1;
  if (lower.includes("2 lần/ngày")) return 2;
  if (lower.includes("3 lần/ngày")) return 3;
  if (lower.includes("1 lần/tuần")) return 1 / 7;
  return 1;
};

type ItemWithPills = patientPrescriptionItems & { pillsPerDose?: number };

const UpdatePrescriptionItemsModal: React.FC<Props> = ({
  open,
  onOpenChange,
  prescription,
  appointmentId,
  onUpdated,
}) => {
  const [items, setItems] = useState<ItemWithPills[]>([]);
  const [note, setNote] = useState<string>(prescription?.note || "");

  useEffect(() => {
    if (open && prescription) {
      const itemList = (prescription as any).prescriptionItems ?? [];
      // Thêm thuộc tính tạm pillsPerDose cho từng item (mặc định 1)
      const itemListWithPills = itemList.map((item: any) => ({
        ...item,
        pillsPerDose: item.pillsPerDose ?? 1,
      }));
      setItems(itemListWithPills);
      setNote(prescription.note || "");
    }
  }, [open, prescription?.prescriptionId]);

  const handleChange = (
    idx: number,
    field: keyof patientPrescriptionItems | "pillsPerDose",
    value: string | number
  ) => {
    setItems((prev) =>
      prev.map((item, i) => {
        if (i !== idx) return item;
        const newItem = { ...item, [field]: value };

        // Lấy số viên/lần uống
        const pillsPerDose =
          field === "pillsPerDose"
            ? Number(value)
            : Number(item.pillsPerDose) || 1;

        // Tính tổng số viên
        const freqPerDay = parseFrequency(
          field === "frequency" ? String(value) : item.frequency
        );
        const days = parseFloat(
          field === "duration" ? String(value) : item.duration
        );
        if (!isNaN(freqPerDay) && !isNaN(days)) {
          newItem.quantity = Math.ceil(pillsPerDose * freqPerDay * days);
        }

        newItem.pillsPerDose = pillsPerDose;
        return newItem;
      })
    );
  };

  const handleSave = async () => {
    try {
      // Nối chuỗi số viên và liều dùng vào dosage
      const itemsToSave = items.map((item) => ({
        ...item,
        dosage: `${item.pillsPerDose || 1} viên (${item.dosage})`,
      }));
      await updatePrescriptionItem(
        appointmentId,
        prescription.prescriptionId,
        itemsToSave,
        note
      );
      alert("Cập nhật thuốc thành công!");
      onOpenChange(false);
      onUpdated?.();
    } catch (err) {
      alert("Cập nhật thất bại!");
      console.error("Cập nhật thuốc thất bại:", err);
    }
  };

  return (
    <BasicModal open={open} onClose={() => onOpenChange(false)}>
      <h2 className="text-2xl font-bold mb-6 text-blue-700">
        Cập nhật thuốc trong phác đồ
      </h2>

      <div className="space-y-6">
        {items && items.length > 0 ? (
          items.map((item, idx) => (
            <div
              key={item.prescriptionItemId ?? idx}
              className="border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              <div className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Pill /> Thuốc: {item.medication.name}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-sm">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Liều dùng (1 viên)
                  </label>
                  <input
                    type="text"
                    value={item.dosage}
                    onChange={(e) =>
                      handleChange(idx, "dosage", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Số viên/lần uống
                  </label>
                  <select
                    value={item.pillsPerDose || 1}
                    onChange={(e) =>
                      handleChange(idx, "pillsPerDose", Number(e.target.value))
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring focus:ring-blue-200"
                  >
                    {pillsPerDoseOptions.map((n) => (
                      <option key={n} value={n}>
                        {n} viên
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Tần suất
                  </label>
                  <select
                    value={item.frequency}
                    onChange={(e) =>
                      handleChange(idx, "frequency", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring focus:ring-blue-200"
                  >
                    {frequencyOptions.map((freq) => (
                      <option key={freq} value={freq}>
                        {freq}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Thời gian (ngày)
                  </label>
                  <input
                    type="number"
                    min={1}
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
                    readOnly
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 italic">
            Không có thuốc trong phác đồ.
          </div>
        )}

        {/* Thêm ô nhập lưu ý */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Lưu ý của bác sĩ
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            rows={3}
            placeholder="Nhập lưu ý về bệnh nhân (nếu có)..."
          />
        </div>
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
