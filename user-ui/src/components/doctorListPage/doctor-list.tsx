import apiGuest from "@/apis/apiGuest";
import type { Doctor } from "@/types/doctor.type";
import { useQuery } from "@tanstack/react-query";
import DoctorCard from "./doctor-card";

function DoctorList() {
  const fetchDoctors = async (): Promise<Doctor[]> => {
    const response = await apiGuest.get("doctors");
    return response.data.data;
  };

  const {
    data: doctors,
    isLoading,
    error,
  } = useQuery<Doctor[], Error>({
    queryKey: ["doctor"],
    queryFn: () => fetchDoctors(),
  });

  if (isLoading) {
    return <div>Đang tải ....</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  const selectDoctor = (doctorId: string) => {
    return doctors?.find((doctor) => doctor.doctorId === doctorId);
  };
  return (
    <div>
      {" "}
      <div className="grid grid-cols-4 gap-5">
        {doctors?.map((doctor) => (
          <DoctorCard
            key={doctor.doctorId}
            doctorId={doctor.doctorId}
            fullName={doctor.fullName}
            email={doctor.email}
            selectDoctor={selectDoctor}
          />
        ))}
      </div>
    </div>
  );
}

export default DoctorList;
