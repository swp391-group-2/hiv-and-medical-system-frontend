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
    return (
      <div>
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]" />
          <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]" />
        </div>
      </div>
    );
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      {" "}
      <div className="grid grid-cols-4 gap-5">
        {doctors?.map((doctor) => (
          <DoctorCard
            key={doctor.doctorId}
            doctorId={doctor.doctorId}
            fullName={doctor.fullName}
            image={doctor.urlImage}
            email={doctor.email}
          />
        ))}
      </div>
    </div>
  );
}

export default DoctorList;
