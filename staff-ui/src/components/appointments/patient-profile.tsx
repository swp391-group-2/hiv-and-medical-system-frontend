import type { Appointment } from "@/types/types";
import { InfoTextRow } from "../info-text";
import { Card, CardContent } from "../ui/card";

const PatientProfileInfo = ({ appt }: { appt: Appointment }) => {
  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InfoTextRow label="Họ và tên" data={appt.patient.fullName} />
        <InfoTextRow label="Giới tính" data={appt.patient.gender} />
        <InfoTextRow label="Ngày sinh" data={appt.patient.dob} />
        <InfoTextRow label="Email" data={appt.patient.email} />
        <InfoTextRow label="Số điện thoại" data={appt.patient.phoneNumber} />
        <InfoTextRow label="Địa chỉ" data={appt.patient.address} />
        <InfoTextRow label="Nghề nghiệp" data={appt.patient.occupation} />
        <InfoTextRow
          label="Mã định danh/CCCD"
          data={appt.patient.identificationCard}
        />
        <InfoTextRow label="Mã BHYT" data={appt.patient.healthInsurance} />
      </CardContent>
    </Card>
  );
};

export default PatientProfileInfo;
