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

  if (!doctors || doctors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] py-12">
        <div className="text-gray-400 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Không có bác sĩ nào được tìm thấy
        </h3>
        <p className="text-gray-500 text-sm">
          Hãy thử tìm kiếm với từ khóa khác hoặc kiểm tra lại thông tin
        </p>
      </div>
    );
  }
  console.log(doctors);

  return (
    <div>
      {" "}
      <div className="grid grid-cols-4 gap-5">
        {doctors?.map((doctor) => (
          <DoctorCard
            key={doctor.doctor.doctorId}
            doctorId={doctor.doctor.doctorId}
            fullName={doctor.doctor.fullName}
            urlImage={doctor.doctor.urlImage}
            totalAppointment={doctor.totalAppointment}
            email={doctor.doctor.email}
          />
        ))}
      </div>
    </div>
  );
}

export default DoctorList;
