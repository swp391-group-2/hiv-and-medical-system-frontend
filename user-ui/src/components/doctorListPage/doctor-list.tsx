import { useQuery } from "@tanstack/react-query";
import DoctorCard from "./doctor-card";
import doctorApi from "@/apis/doctor.api";
import Loading from "../common/loading";
import ErrorQuery from "../common/error-query";

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
    refetch,
  } = useQuery({
    queryKey: ["doctor", page, search],
    queryFn: async () => {
      const doctors = await doctorApi.getDoctors(page, SIZE, search);
      return doctors.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loading />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <ErrorQuery
          error={error}
          message="Không thể tải danh sách bác sĩ. Vui lòng thử lại sau."
          onRetry={refetch}
        />
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
