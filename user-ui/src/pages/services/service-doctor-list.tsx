import DoctorHero from "@/components/doctorListPage/doctor-hero";
import DoctorCards from "@/components/doctorListPage/DoctorCards";
import FinderBar from "@/components/doctorListPage/FinderBar";
import Pagination from "@/components/doctorListPage/Pagination";
import SortDoctorSelect from "@/components/doctorListPage/SortDoctorSelect";
import { allDoctorsData } from "@/raw-data/doctors";
import React, { useEffect, useState } from "react";

export type Doctor = {
  id: string;
  name: string;
  rating: number;
  email: string;
  image?: string;
};

const PAGE_SIZE = 8; // Số bác sĩ mỗi trang

const ServiceDoctorList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [search, setSearch] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

  // const fetchDoctors = async () => {
  //   try {
  //     const response = await apiGuest.get<Doctor[]>("/doctors");
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching doctors:", error);
  //     throw new Error("Failed to load doctor data.");
  //   }
  // };

  // const { doctors, isLoading, error } = useQuery<Doctor[], Error>({
  //   queryKey: ["doctors"],
  //   queryFn: fetchDoctors,
  // });

  useEffect(() => {
    // Giả lập API fetch

    setAllDoctors(allDoctorsData);
  }, []);

  // Lọc bác sĩ theo từ khóa
  const filteredDoctors = search
    ? allDoctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(search.toLowerCase())
      )
    : allDoctors;

  // Sắp xếp theo rating
  const sortedDoctors = [...filteredDoctors].sort((a, b) =>
    sortOrder === "desc" ? b.rating - a.rating : a.rating - b.rating
  );

  // Phân trang
  const totalPages = Math.ceil(sortedDoctors.length / PAGE_SIZE);
  const paginatedDoctors = sortedDoctors.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div>
      <DoctorHero />

      <div className="container mx-auto  min-h-screen">
        <main className="px-8 py-6 ">
          <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-6 tracking-tight">
            Đặt khám bác sĩ
          </h1>
          <div className="w-24 h-1 bg-blue-300 rounded mx-auto mb-8"></div>
          <div className="flex flex-row  gap-4 mb-4">
            <FinderBar search={search} setSearch={setSearch} />
            <SortDoctorSelect
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>
          <DoctorCards doctors={paginatedDoctors} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default ServiceDoctorList;
