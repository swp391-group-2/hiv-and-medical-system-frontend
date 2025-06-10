import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const tabs = [
  { label: "Thông tin chung", value: "info" },
  { label: "Phác đồ điều trị", value: "regimen" },
];

const regimens = [
  {
    name: "Phác đồ 1 (TDF + 3TC + DTG)",
    drugs: "Tenofovir (TDF) + Lamivudine (3TC) + Dolutegravir (DTG)",
    dosage: "TDF 300mg + 3TC 300mg + DTG 50mg, uống 1 lần/ngày",
    indication:
      "Phác đồ ưu tiên cho người lớn và trẻ vị thành niên ≥ 10 tuổi hoặc ≥ 30kg.",
    note: "Không dùng cho phụ nữ có thai 3 tháng đầu hoặc có chống chỉ định với DTG.",
  },
  {
    name: "Phác đồ 2 (TDF + 3TC + EFV)",
    drugs: "Tenofovir (TDF) + Lamivudine (3TC) + Efavirenz (EFV)",
    dosage: "TDF 300mg + 3TC 300mg + EFV 600mg, uống 1 lần/ngày",
    indication: "Dùng khi không có hoặc chống chỉ định với DTG.",
    note: "Không dùng cho phụ nữ có thai 3 tháng đầu hoặc có chống chỉ định với EFV.",
  },
  {
    name: "Phác đồ 3 (AZT + 3TC + EFV)",
    drugs: "Zidovudine (AZT) + Lamivudine (3TC) + Efavirenz (EFV)",
    dosage:
      "AZT 300mg x 2 lần/ngày + 3TC 150mg x 2 lần/ngày + EFV 600mg 1 lần/ngày",
    indication: "Dùng khi không dùng được TDF.",
    note: "Theo dõi tác dụng phụ thiếu máu do AZT.",
  },
  {
    name: "Phác đồ 4 (TDF + 3TC + LPV/r)",
    drugs: "Tenofovir (TDF) + Lamivudine (3TC) + Lopinavir/ritonavir (LPV/r)",
    dosage: "TDF 300mg + 3TC 300mg 1 lần/ngày + LPV/r 400/100mg x 2 lần/ngày",
    indication: "Dùng cho bệnh nhân thất bại phác đồ bậc 1.",
    note: "Theo dõi chức năng gan, thận.",
  },
];

interface PatientDialogProps {
  name: string;
  id: string;
  sampleCode: string;
  resultLabel: string;
  resultColor: string;
  date: string;
  doctor: string;
  age: number;
  gender: string;
  viralLoad: string;
  cd4: string;
}

const PatientDialog: React.FC<PatientDialogProps> = ({
  name,
  id,
  date,
  doctor,
  age,
  gender,
  viralLoad,
  cd4,
}) => {
  const [tab, setTab] = useState("regimen");
  const [selectedRegimen, setSelectedRegimen] = useState(0);

  return (
    <Dialog>
      <DialogTrigger className="bg-blue-600 text-white px-4 py-2 rounded">
        Khám
      </DialogTrigger>
      <DialogContent
        className="w-[100vw] max-w-full h-[90vh] p-6 overflow-y-auto"
        style={{ maxWidth: "80vw", width: "100vw" }}
      >
        <DialogHeader>
          <DialogTitle>Khám bệnh nhân</DialogTitle>
          <DialogDescription>
            Thông tin chi tiết và xác nhận điều trị.
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4">
          <div className="flex border-b mb-2">
            {tabs.map((t) => (
              <button
                key={t.value}
                className={`px-4 py-2 -mb-px border-b-2 ${
                  tab === t.value
                    ? "border-blue-600 font-semibold"
                    : "border-transparent"
                }`}
                onClick={() => setTab(t.value)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {tab === "info" && (
          <>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Thông tin chung</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  Họ tên: <span className="font-medium">{name}</span>
                </div>
                <div>
                  Mã BN: <span className="font-medium">{id}</span>
                </div>
                <div>
                  Tuổi: <span className="font-medium">{age}</span>
                </div>
                <div>
                  Giới tính: <span className="font-medium">{gender}</span>
                </div>
                <div>
                  Bác sĩ: <span className="font-medium">{doctor}</span>
                </div>
                <div>
                  Ngày: <span className="font-medium">{date}</span>
                </div>
              </div>
            </div>
            {/* Kết quả xét nghiệm */}
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Kết quả xét nghiệm</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  Tải lượng HIV:{" "}
                  <span className="font-medium">{viralLoad}</span>
                </div>
                <div>
                  CD4: <span className="font-medium">{cd4}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {tab === "regimen" && (
          <div className="mb-4 w-full">
            <h3 className="font-semibold mb-2">Phác đồ điều trị</h3>
            <div className="flex flex-row gap-8 w-full">
              {/* Form chọn phác đồ */}
              <div className="flex-1">
                <label className="block mb-2">Chọn phác đồ điều trị:</label>
                <select
                  className="border rounded px-3 py-2 w-full"
                  value={selectedRegimen}
                  onChange={(e) => setSelectedRegimen(Number(e.target.value))}
                >
                  {regimens.map((r, idx) => (
                    <option value={idx} key={r.name}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* Thông tin phác đồ */}
              <div className="flex-1 bg-gray-50 rounded p-4 border">
                <h4 className="font-semibold mb-2">
                  {regimens[selectedRegimen].name}
                </h4>
                <ul className="text-sm list-disc pl-5">
                  <li>
                    <b>Thuốc:</b> {regimens[selectedRegimen].drugs}
                  </li>
                  <li>
                    <b>Liều dùng:</b> {regimens[selectedRegimen].dosage}
                  </li>
                  <li>
                    <b>Chỉ định:</b> {regimens[selectedRegimen].indication}
                  </li>
                  <li>
                    <b>Lưu ý:</b> {regimens[selectedRegimen].note}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Nút xác nhận */}
        <div className="flex justify-end">
          <button className="bg-blue-600 text-white px-6 py-1 rounded hover:bg-blue-700">
            Xác nhận
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDialog;
