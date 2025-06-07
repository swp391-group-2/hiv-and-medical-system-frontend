import DoctorCards from "@/components/doctorListPage/DoctorCards";
import FinderBar from "@/components/doctorListPage/FinderBar";
import Pagination from "@/components/doctorListPage/Pagination";
import SortDoctorSelect from "@/components/doctorListPage/SortDoctorSelect";
import React, { useEffect, useState } from "react";

type Doctor = {
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
    const allDoctorsData: Doctor[] = [
      {
        name: "TS. BS. Nguyễn Minh Quân",
        rating: 4.9,
        image:
          "https://www.fvhospital.com/wp-content/uploads/2019/04/dr-nguyen-tuan-dinh.jpg",
      },
      {
        name: "PGS. TS. Lê Thị Hồng Nhung",
        rating: 4.7,
        image:
          "https://www.fvhospital.com/wp-content/uploads/2018/09/drminhhien.jpg",
      },
      {
        name: "BS. CKI. Trần Văn Dũng",
        rating: 4.8,
        image:
          "https://rafflesmedical.vn/wp-content/uploads/2019/12/bs-phan-chu-trinh-e1575541397608-1603x2000.jpg",
      },
      {
        name: "TS. BS. Phạm Thị Thu Hà",
        rating: 4.5,
        image:
          "https://chaohanoi.com/wp-content/uploads/2020/02/Vietnam-doctor.jpg",
      },
      {
        name: "BS. Đoàn Quốc Bảo",
        rating: 4.6,
        image:
          "https://vnn-imgs-f.vgcloud.vn/2020/07/19/14/5-1.jpg?width=0&s=U4fe3mbjHzMw13D2sxdTVA",
      },
      {
        name: "BS. Nguyễn Hữu Nghĩa",
        rating: 4.4,
        image:
          "https://docosan.s3.ap-southeast-1.amazonaws.com/publics/images/doctor/1394/thumb/img2021102712072755829100.png",
      },
      {
        name: "BS. Nguyễn Tuấn Đình",
        rating: 4.7,
        image:
          "https://www.fvhospital.com/wp-content/uploads/2019/04/dr-nguyen-tuan-dinh-600x315.jpg",
      },
      {
        name: "BS. Trịnh Văn Hùng",
        rating: 4.9,
        image:
          "https://cdn2.tuoitre.vn/thumb_w/480/2018/2/10/bac-si-tran-huynh-151824259749249048360.jpg",
      },
      {
        name: "BS. Nguyễn Văn Hòa",
        rating: 4.5,
        image: "https://bacsithucung.vn/wp-content/uploads/2022/01/bsdung.png",
      },
      {
        name: "BS. Nam Trần",
        rating: 4.6,
        image:
          "https://bacsinam.vn/wp-content/uploads/2023/06/Bac-si-Nam-Tran-1024x1024.png",
      },
      {
        name: "BS. Đỗ Quốc Dũng",
        rating: 4.7,
        image: "https://bacsithucung.vn/wp-content/uploads/2022/01/bsdung.png",
      },
      {
        name: "BS. Phạm Nguyễn Vinh",
        rating: 4.8,
        image:
          "https://phamnguyenvinh.org/wp-content/uploads/2019/06/dr-pham-nguyen-vinh-250x375.jpg",
      },
    ];
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
