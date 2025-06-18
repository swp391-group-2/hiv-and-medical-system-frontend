import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import type { Prescription, PrescriptionItem } from "@/types/prescription";
import {
  updatePrescription,
  updatePrescriptionItem,
} from "@/api/doctorChonPhacDo";

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
      // Gọi API cập nhật prescription (bạn cần viết API updatePrescriptionItems phù hợp backend)
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Cập nhật thuốc trong phác đồ</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div key={item.prescriptionItemId} className="border-b pb-2 mb-2">
              <div>
                <b>Thuốc:</b> {item.medication.name}
              </div>
              <div className="flex gap-2 mt-1">
                <div>
                  <label className="block text-xs">Liều dùng</label>
                  <input
                    type="text"
                    value={item.dosage}
                    onChange={(e) =>
                      handleChange(idx, "dosage", e.target.value)
                    }
                    className="border rounded px-2 py-1 w-24"
                  />
                </div>
                <div>
                  <label className="block text-xs">Tần suất</label>
                  <input
                    type="text"
                    value={item.frequency}
                    onChange={(e) =>
                      handleChange(idx, "frequency", e.target.value)
                    }
                    className="border rounded px-2 py-1 w-24"
                  />
                </div>
                <div>
                  <label className="block text-xs">Thời gian</label>
                  <input
                    type="text"
                    value={item.duration}
                    onChange={(e) =>
                      handleChange(idx, "duration", e.target.value)
                    }
                    className="border rounded px-2 py-1 w-24"
                  />
                </div>
                <div>
                  <label className="block text-xs">Số lượng</label>
                  <input
                    type="number"
                    value={item.quantity || ""}
                    onChange={(e) =>
                      handleChange(idx, "quantity", e.target.value)
                    }
                    className="border rounded px-2 py-1 w-24"
                    min={0}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="bg-gray-200 px-4 py-2 rounded"
            onClick={() => onOpenChange(false)}
          >
            Hủy
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSave}
          >
            Lưu thay đổi
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePrescriptionItemsModal;