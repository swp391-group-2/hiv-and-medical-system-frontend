import type { Appointment } from "@/types/types";
import { InfoGroup, InfoTextRow } from "../info-text";

const PatientProfileInfo = ({ appt }: { appt: Appointment }) => {
  return (
    <InfoGroup>
      <InfoTextRow label="Họ và tên" data={appt.patient.fullName} />
      <InfoTextRow label="Giới tính" data={appt.patient.gender} />
      <InfoTextRow label="Ngày tháng năm sinh" data={appt.patient.dob} />
      <InfoTextRow label="Email" data={appt.patient.email} />
      <InfoTextRow label="Số điện thoại" data={appt.patient.phoneNumber} />
      <InfoTextRow label="Địa chỉ" data={appt.patient.address} />
      <InfoTextRow label="Nghề nghiệp" data={appt.patient.occupation} />
      <InfoTextRow
        label="Mã định danh/CCCD"
        data={appt.patient.identificationCard}
      />
      <InfoTextRow label="Mã BHYT" data={appt.patient.healthInsurance} />
    </InfoGroup>
  );
};

export default PatientProfileInfo;
