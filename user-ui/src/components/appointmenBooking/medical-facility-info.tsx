import {
  BriefcaseMedical,
  Clipboard,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { Card } from "../ui/card";

const medicalInfoList: {
  id: number;
  title: string;
  info: string;
  icon: LucideIcon;
}[] = [
  {
    id: 1,
    title: "Cơ Sở Y Tế ",
    info: "Tổ 1 ấp 1 Xã Lạc An huyện Bắc Tân Uyên, Tình Bình Dương",
    icon: MapPin,
  },
  {
    id: 2,
    title: "Dịch Vụ ",
    info: "Khám Điểu Trị HiV",
    icon: Clipboard,
  },
  {
    id: 3,
    title: "Bác sĩ ",
    info: "Uông Thanh Tú",
    icon: BriefcaseMedical,
  },
];

function MedicalFacilityInfo() {
  return (
    <Card className="bg-white shadow-lg overflow-hidden py-0">
      <div className="bg-cyan-400 text-white px-4 py-3">
        <h2 className=" font-semibold text-xl">Thông tin cơ sở y tế</h2>
      </div>
      <div className="p-4 space-y-4">
        {medicalInfoList.map((medicalInfo) => (
          <div key={medicalInfo.id} className="border-b pb-4">
            <div className="flex items-start space-x-3">
              <div className="bg-gray-100 p-2 rounded">
                <medicalInfo.icon className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">
                  {medicalInfo.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{medicalInfo.info}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default MedicalFacilityInfo;
