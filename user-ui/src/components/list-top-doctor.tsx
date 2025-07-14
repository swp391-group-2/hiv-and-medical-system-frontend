import doctorApi from "@/apis/doctor.api";
import { useQuery } from "@tanstack/react-query";

import DoctorCard from "./doctorListPage/doctor-card";
import Loading from "./common/loading";
import ErrorQuery from "./common/error-query";

function ListTopDoctor() {
  const {
    data: doctors,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["topDoctors"],
    queryFn: async () => {
      const response = await doctorApi.getTopAppointmentDoctors();
      return response.data;
    },
  });

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <ErrorQuery
        error={error}
        message="Không thể tải bác sĩ"
        onRetry={() => refetch()}
      />
    );
  }
  if (!doctors || doctors.length === 0) {
    return (
      <div className="text-center py-8">Không có bác sĩ nào được tìm thấy</div>
    );
  }

  return (
    <div className="grid-cols-4 grid gap-5">
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.doctorId}
          doctorId={doctor.doctorId}
          fullName={doctor.fullName}
          urlImage={doctor.urlImage}
          email={doctor.email}
          totalAppointment={doctor.totalAppointment}
        />
      ))}
    </div>
  );
}

export default ListTopDoctor;
