import {
  BriefcaseMedical,
  Clipboard,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { Card } from "../ui/card";
import useBookingStore from "@/stores/booking.store";
import type { Service } from "@/types/service.type";

interface MedicalFacilityInfoProps {
  service: Service;
}

function MedicalFacilityInfo({ service }: MedicalFacilityInfoProps) {
  const doctor = useBookingStore((state) => state.doctor);
  const setService = useBookingStore((state) => state.setService);
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
  ];

  if (service) {
    setService(service);
    medicalInfoList.push({
      id: 2,
      title: "Dịch Vụ ",
      info: service.name || "Dịch vụ chưa được chọn",
      icon: Clipboard,
    });
  }

  if (doctor) {
    medicalInfoList.push({
      id: 3,
      title: "Bác sĩ ",
      info: doctor?.fullName || "Bác sĩ chưa được chọn",
      icon: BriefcaseMedical,
    });
  }

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
