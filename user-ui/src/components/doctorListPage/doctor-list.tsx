import type { DoctorProfile } from "@/types/doctor.type";
import { useQuery } from "@tanstack/react-query";
import DoctorCard from "./doctor-card";
import doctorApi from "@/apis/doctor.api";

const SIZE = 12;

type DoctorListProps = {
  page?: number;
  search?: string;
};

function DoctorList({ page = 1, search = "" }: DoctorListProps) {
  const {
    data: doctors,
    isLoading,
    error,
  } = useQuery<DoctorProfile[]>({
    queryKey: ["doctor", page, search],
    queryFn: async () => {
      const doctors = await doctorApi.getDoctors(page, SIZE, search);
      return doctors.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-sky-500 animate-bounce [animation-delay:.7s]" />
          <div className="w-4 h-4 rounded-full bg-sky-500 animate-bounce [animation-delay:.3s]" />
          <div className="w-4 h-4 rounded-full bg-sky-500 animate-bounce [animation-delay:.7s]" />
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-center">
          <div className="text-red-500 text-lg font-semibold mb-2">
            Có lỗi xảy ra
          </div>
          <div className="text-gray-600">{error.message}</div>
        </div>
      </div>
    );
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
            urlImage={doctor.urlImage}
            email={doctor.email}
          />
        ))}
      </div>
    </div>
  );
}

export default DoctorList;
