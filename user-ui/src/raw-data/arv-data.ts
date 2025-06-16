import type { Medicine, ArvInfoProps } from "@/components/user/arv/arv-list";
export const meds = [
  {
    id: "M001",
    name: "Paracetamol",
    dosage: "1 vien/ngay",
    time: ["7:00"],
    note: "Uong sau khi an sang",
    checked: false,
  },
  {
    id: "M002",
    name: "Schesazuag",
    dosage: "1 vien/ngay",
    time: ["12:00"],
    note: "Uong sau khi an trua",
    checked: false,
  },
  {
    id: "M003",
    name: "Hepzitaega",
    dosage: "2 vien/ngay",
    time: ["7:00", "19:00"],
    note: "Uong sau khi an sang va sau khi an toi",
    checked: false,
  },
  {
    id: "M004",
    name: "Veradage",
    dosage: "2 vien/ngay",
    time: ["12:00", "19:00"],
    note: "Uong sau khi an trua va sau khi an toi",
    checked: false,
  },
] as Medicine[];

export const arvInfoData = {
  id: "A001",
  name: "ABC/XYZ",
  meds: meds,
} as ArvInfoProps;

export const arvCautions = [
  "Uống thuốc đúng giờ và đúng liều lượng theo chỉ định của bác sĩ.",
  "Không bỏ liều hoặc tự ý ngưng thuốc khi chưa có chỉ định của bác sĩ.",
  "Nếu quên uống thuốc, hãy uống ngay khi nhớ ra, trừ khi đã gần đến liều tiếp theo.",
  "Liên hệ bác sĩ nếu gặp bất kỳ tác dụng phụ nào.",
];
