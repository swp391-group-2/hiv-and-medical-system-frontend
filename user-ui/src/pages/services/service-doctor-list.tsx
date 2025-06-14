import apiGuest from "@/apis/apiGuest";
import DoctorHero from "@/components/doctorListPage/doctor-hero";
import DoctorCards from "@/components/doctorListPage/DoctorCards";
import FinderBar from "@/components/doctorListPage/FinderBar";

import type { Doctor } from "@/types/doctor.type";
import { useQuery } from "@tanstack/react-query";

import { useState } from "react";

const ServiceDoctorList = () => {
  const [search, setSearch] = useState<string>("");

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
  return (
    <div>
      <DoctorHero />
      <div className="container mx-auto min-h-screen">
        <main className="px-8 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-6 tracking-tight">
            Đặt khám bác sĩ
          </h1>
          <div className="w-24 h-1 bg-blue-300 rounded mx-auto mb-8"></div>
          <div className="flex flex-row gap-4 mb-4">
            <FinderBar search={search} setSearch={setSearch} />
            {/* <SortDoctorSelect
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            /> */}
          </div>
          <div className="grid grid-cols-4 gap-5">
            {doctors?.map((doctor) => (
              <DoctorCards
                key={doctor.doctorId}
                doctorId={doctor.doctorId}
                fullName={doctor.fullName}
                email={doctor.email}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ServiceDoctorList;
