import {
  BriefcaseMedical,
  Clipboard,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { Card } from "../ui/card";
import { useParams } from "react-router-dom";
import useBookingStore from "@/stores/booking.store";
import { useQuery } from "@tanstack/react-query";
import serviceApi from "@/apis/service.api";

function MedicalFacilityInfo() {
  const { serviceType } = useParams<{ serviceType: string }>();
  const doctor = useBookingStore((state) => state.doctor);
  const setService = useBookingStore((state) => state.setService);

  const { data: service, isLoading } = useQuery({
    queryKey: ["service", serviceType],
    queryFn: async () => {
      if (!serviceType) {
        throw new Error("Service type is required");
      }
      const response = await serviceApi
        .getServicesByType(serviceType)
        .then((res) => res.data);
      return response;
    },
    enabled: !!serviceType,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="error">Failed to load service data</div>
      </div>
    );
  }

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
