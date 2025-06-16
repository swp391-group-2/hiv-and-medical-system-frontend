import doctorApi, { type DoctorsApiResponse } from "@/apis/doctor.api";
import type { Doctor } from "@/types/doctor.type";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import DoctorCard from "./doctorListPage/doctor-card";

function ListTopDoctor() {
  const {
    data: doctors,
    isLoading,
    error,
  } = useQuery<DoctorsApiResponse, Error>({
    queryKey: ["topDoctors"],
    queryFn: () => doctorApi.getTopDoctors(),
  });

  if (isLoading)
    return (
      <div className="w-full gap-x-2 flex justify-center items-center">
        <div className="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full animate-bounce" />
        <div className="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full animate-bounce" />
        <div className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full animate-bounce" />
      </div>
    );

  if (error) {
    toast.error("Lỗi Không tải được ...");
    return <div>Có lỗi xảy ra</div>;
  }

  const doctorsList: Doctor[] = doctors?.data || [];

  if (doctorsList.length === 0) {
    return <div>Không có bác sĩ </div>;
  }

  const selectDoctor = (doctorId: string) => {
    return doctorsList?.find((doctor) => doctor.doctorId === doctorId);
  };

  return (
    <div className="grid-cols-4 grid gap-5">
      {doctorsList.map((doctor) => (
        <DoctorCard
          key={doctor.doctorId}
          doctorId={doctor.doctorId}
          fullName={doctor.fullName}
          image={doctor.urlImage}
          email={doctor.email}
          selectDoctor={selectDoctor}
        />
      ))}
    </div>
  );
}

export default ListTopDoctor;
