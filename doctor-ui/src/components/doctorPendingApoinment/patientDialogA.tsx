// import React, { useState } from "react";
// import axios from "axios";
// import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
// import { DialogHeader } from "../ui/dialog";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogDescription,
// // } from "@/components/ui/dialog";

// // const tabs = [
// //   { label: "Thông tin chung", value: "info" },
// //   { label: "Phác đồ điều trị", value: "regimen" },
// // ];

// const regimens = [
//   {
//     name: "Phác đồ 1 (TDF + 3TC + DTG)",
//     drugs: "Tenofovir (TDF) + Lamivudine (3TC) + Dolutegravir (DTG)",
//     dosage: "TDF 300mg + 3TC 300mg + DTG 50mg, uống 1 lần/ngày",
//     indication: "Phác đồ ưu tiên cho người ≥ 10 tuổi hoặc ≥ 30kg.",
//     note: "Không dùng cho phụ nữ có thai 3 tháng đầu hoặc chống chỉ định DTG.",
//   },
//   {
//     name: "Phác đồ 2 (TDF + 3TC + EFV)",
//     drugs: "Tenofovir (TDF) + Lamivudine (3TC) + Efavirenz (EFV)",
//     dosage: "TDF 300mg + 3TC 300mg + EFV 600mg, uống 1 lần/ngày",
//     indication: "Dùng khi chống chỉ định DTG.",
//     note: "Không dùng cho phụ nữ có thai 3 tháng đầu hoặc chống chỉ định EFV.",
//   },
//   {
//     name: "Phác đồ 3 (AZT + 3TC + EFV)",
//     drugs: "Zidovudine (AZT) + Lamivudine (3TC) + Efavirenz (EFV)",
//     dosage: "AZT 300mg x2 + 3TC 150mg x2 + EFV 600mg 1 lần/ngày",
//     indication: "Dùng khi không dùng được TDF.",
//     note: "Theo dõi thiếu máu do AZT.",
//   },
//   {
//     name: "Phác đồ 4 (TDF + 3TC + LPV/r)",
//     drugs: "TDF + 3TC + Lopinavir/ritonavir (LPV/r)",
//     dosage: "TDF 300mg + 3TC 300mg 1 lần/ngày + LPV/r 400/100mg x2",
//     indication: "Dùng cho bệnh nhân thất bại phác đồ bậc 1.",
//     note: "Theo dõi chức năng gan, thận.",
//   },
// ];

// export interface Appointment {
//   appointmentId: number;
//   patient: {
//     patientId: string;
//     userId: string;
//     email: string;
//     fullName: string;
//     userStatus: string;
//     patientCode: string;
//     dob: Date;
//     gender: string;
//     address: string;
//     phoneNumber: string;
//     identificationCard: string;
//     healthInsurance: string;
//     occupation: string;
//   };
//   date: string;
//   doctorName: string;
//   labResult?: {
//     resultText: string;
//     conclusion: string;
//     viralLoad?: string;
//     cd4?: string;
//   };
// }

// interface Props {
//   appointment: Appointment;
//   open: boolean;
//   onClose: () => void;
// }

// const PatientDialog: React.FC<Props> = ({ appointment, open, onClose }) => {
//   const [tab, setTab] = useState("info");
//   const [selectedRegimen, setSelectedRegimen] = useState(0);
//   const { patient, date, doctorName, labResult } = appointment;

//   const handleConfirm = async () => {
//     try {
//       const selected = regimens[selectedRegimen];
//       // Dòng này có thể thay thế bằng console.log nếu bạn không gọi API thật
//       await axios.post("/api/regimens/assign", {
//         appointmentId: appointment.appointmentId,
//         regimen: selected,
//       });

//       alert("Phác đồ đã được lưu thành công!");
//       onClose();
//     } catch (err) {
//       console.error("Lỗi khi lưu phác đồ:", err);
//       alert("Có lỗi xảy ra khi lưu phác đồ!");
//     }
//   };

//   return (

//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="!w-[95vw] !max-w-[1400px] !h-[90vh] p-6 overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>Khám {patient.fullName}</DialogTitle>
//           <DialogDescription>Dịch vụ khám ngày {date}</DialogDescription>
//         </DialogHeader>

//         <div className="flex border-b mb-4">
//           {Tabs.map((t) => (
//             <button
//               key={t.value}
//               onClick={() => setTab(t.value)}
//               className={`px-4 py-2 -mb-px border-b-2 ${
//                 tab === t.value
//                   ? "border-blue-600 font-semibold"
//                   : "border-transparent"
//               }`}
//             >
//               {t.label}
//             </button>
//           ))}
//         </div>

//         {tab === "info" && (
//           <>
//             <div className="grid grid-cols-2 gap-4 text-sm mb-6">
//               <Info label="Họ tên" value={patient.fullName} />
//               <Info label="Mã BN" value={patient.patientCode} />
//               <Info
//                 label="Ngày sinh"
//                 value={new Date(patient.dob).toLocaleDateString("vi-VN")}
//               />
//               <Info label="Giới tính" value={patient.gender} />
//               <Info label="Bác sĩ" value={doctorName} />
//               <Info label="Ngày khám" value={date} />
//             </div>

//             <h3 className="font-semibold mb-2">Kết quả xét nghiệm</h3>
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <Info
//                 label="Tải lượng HIV"
//                 value={labResult?.viralLoad ?? "Chưa có"}
//               />
//               <Info label="CD4" value={labResult?.cd4 ?? "Chưa có"} />
//             </div>
//           </>
//         )}

//         {tab === "regimen" && (
//           <div className="mb-4">
//             <div className="grid grid-cols-2 gap-6">
//               <div>
//                 <label className="block mb-2">Chọn phác đồ:</label>
//                 <select
//                   className="border rounded px-3 py-2 w-full"
//                   value={selectedRegimen}
//                   onChange={(e) => setSelectedRegimen(Number(e.target.value))}
//                 >
//                   {regimens.map((r, i) => (
//                     <option key={i} value={i}>
//                       {r.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="bg-gray-50 border rounded p-4 text-sm">
//                 <h4 className="font-semibold mb-2">
//                   {regimens[selectedRegimen].name}
//                 </h4>
//                 <ul className="list-disc pl-5 space-y-1">
//                   <li>
//                     <b>Thuốc:</b> {regimens[selectedRegimen].drugs}
//                   </li>
//                   <li>
//                     <b>Liều dùng:</b> {regimens[selectedRegimen].dosage}
//                   </li>
//                   <li>
//                     <b>Chỉ định:</b> {regimens[selectedRegimen].indication}
//                   </li>
//                   <li>
//                     <b>Lưu ý:</b> {regimens[selectedRegimen].note}
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="flex justify-end mt-6">
//           <button
//             onClick={handleConfirm}
//             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//           >
//             Xác nhận
//           </button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// const Info = ({ label, value }: { label: string; value: string }) => (
//   <div>
//     <span className="text-gray-500">{label}:</span>{" "}
//     <span className="font-medium">{value}</span>
//   </div>
// );

// export default PatientDialog;
