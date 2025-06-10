import DoctorCards from "@/components/doctorListPage/DoctorCards";
import FinderBar from "@/components/doctorListPage/FinderBar";
import Pagination from "@/components/doctorListPage/Pagination";
import SortDoctorSelect from "@/components/doctorListPage/SortDoctorSelect";
import { allDoctorsData } from "@/raw-data/doctors";
import React, { useEffect, useState } from "react";

export type Doctor = {
  name: string;
  rating: number;
  image?: string;
};

const PAGE_SIZE = 4; // Số bác sĩ mỗi trang

const ServiceDoctorList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [search, setSearch] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");

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
    <div className="container mx-auto flex flex-col min-h-screen">
      <main className="flex-grow px-8 py-6 bg-gray-50">
        <h1
          className="text-3xl md:text-4xl font-bold text-black-700 text-center mb-6 tracking-tight"
          style={{ textShadow: "0 2px 8px #e0e7ef" }}
        >
          Đặt khám bác sĩ
        </h1>
        <div className="w-24 h-1 bg-blue-300 rounded mx-auto mb-8"></div>
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <FinderBar search={search} setSearch={setSearch} />
          <div className="w-full md:w-60">
            <SortDoctorSelect
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>
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
  );
};

export default ServiceDoctorList;
