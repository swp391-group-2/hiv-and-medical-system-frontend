import {
  BriefcaseMedical,
  Clipboard,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { Card } from "../ui/card";
import { useParams } from "react-router-dom";

function MedicalFacilityInfo() {
  const { serviceType } = useParams<{ serviceType: string }>();
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
      info:
        serviceType === "confirmatorytest"
          ? "Xét nghiệm khẳng định HIV"
          : serviceType === "screeningtest"
          ? "Xét nghiệm sàng lọc HIV"
          : "Dịch vụ khám bệnh",
      icon: Clipboard,
    },
    {
      id: 3,
      title: "Bác sĩ ",
      info: "Uông Thanh Tú",
      icon: BriefcaseMedical,
    },
  ];
  return (
    <Card className="bg-white shadow-lg overflow-hidden py-0">
      <div className="bg-primary text-white px-4 py-3">
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
                <h3 className="font-semibold text-gray-800"></h3>
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
