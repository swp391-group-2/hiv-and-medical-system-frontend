import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArvLabels, ArvItem } from "@/components/user/arv/arv-list";
import ArvCaution from "@/components/user/arv/arv-caution";
import { useQuery } from "@tanstack/react-query";
import userApi from "@/apis/user.api";
import type {
  Prescription,
  PrescriptionsResponse,
} from "@/types/prescriptions.type";
import { useProfileStore } from "@/stores/profile.store";

const Arv = () => {
  const userProfile = useProfileStore((state) => state.profile);
  const { data: prescription, isLoading } = useQuery<PrescriptionsResponse>({
    queryKey: ["prescription"],
    queryFn: () => {
      const response = userApi
        .getPatientPrescriptions(userProfile.patientId)
        .then((res) => res.data);
      return response;
    },
  });

  if (isLoading) {
    return (
      <div className="w-full mt-7 flex justify-center items-center mr-10">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce" />
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.3s]" />
          <div className="w-4 h-4 rounded-full bg-primary animate-bounce [animation-delay:-.5s]" />
        </div>
      </div>
    );
  }

  const prescriptionData: Prescription = prescription?.data || {
    id: 0,
    duration: 0,
    note: "",
    createdAt: "",
    prescriptionDefaultId: 0,
    prescriptionDefaultName: "",
    patientPrescriptionItems: [],
  };

  const prescriptionStartDate = new Date(prescriptionData.createdAt);
  const prescriptionEndDate = new Date(
    prescriptionStartDate.getTime() +
      prescriptionData.duration * 24 * 60 * 60 * 1000
  );

  const patientPrescriptionItems =
    prescriptionData.patientPrescriptionItems || [];

  return (
    <section className="w-full mt-7 mr-10">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-center text-primary">
            Thông Tin Phác Đồ Hiện Tại
          </CardTitle>
          <CardDescription className="text-black font-bold text-xl">
            Phác đồ điều trị: {prescriptionData.prescriptionDefaultName}
          </CardDescription>
          <CardDescription className="text-xl">
            Bắt đầu áp dụng{" "}
            {prescriptionStartDate.toLocaleDateString("vi") +
              " - " +
              prescriptionEndDate.toLocaleDateString("vi")}
          </CardDescription>
          <CardDescription className="text-lg text-center">
            Đây là phác đồ điều trị hiện tại của bạn. Vui lòng tuân thủ đúng
            hướng dẫn để đạt hiệu quả tốt nhất.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ArvLabels />
          <ArvItem item={patientPrescriptionItems} />
        </CardContent>
      </Card>
      {prescriptionData.note && <ArvCaution note={prescriptionData.note} />}
    </section>
  );
};

export default Arv;
