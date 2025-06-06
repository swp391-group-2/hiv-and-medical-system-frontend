import DoctorCards from "@/components/doctorListPage/DoctorCards";
import FinderBar from "@/components/doctorListPage/finderBar";
import Pagination from "@/components/doctorListPage/Pagination";
import React, { useEffect, useState } from "react";

type Doctor = {
  name: string;
  specialty: string;
  rating: number;
};

const ServiceDoctorList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 5; // ví dụ 5 trang
  const [doctors, setDoctors] = useState<Doctor[]>([
    { name: "", specialty: "", rating: 0 },
  ]);
  const [allDoctors, setAllDoctors] = useState<Doctor[][]>([]); // Lưu toàn bộ danh sách bác sĩ
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    // Giả lập API fetch
    const allDoctorsData = [
      [
        {
          name: "TS. BS. Nguyễn Văn Hóa",
          specialty: "Truyền nhiễm",
          rating: 4.9,
        },
        { name: "PGS. TS. Trần Thị Mạnh Dũng", specialty: "Nội", rating: 4.7 },
        { name: "BS. CKI. Lê Văn Luyện", specialty: "Miễn dịch", rating: 4.8 },
        {
          name: "TS. BS. Phạm Thị Hung Hăng",
          specialty: "Tâm lý",
          rating: 4.5,
        },
      ],
      [
        { name: "BS. Đoàn Tiến Chung", specialty: "Nhi", rating: 4.6 },
        { name: "BS. Phông Văn Bạc", specialty: "Tai mũi họng", rating: 4.4 },
        { name: "BS. Lê Thị Lung Linh", specialty: "Da liễu", rating: 4.7 },
        {
          name: "BS. Trịnh Trần Phương Tuấn",
          specialty: "Tim mạch",
          rating: 4.9,
        },
      ],
      [
        { name: "BS. Thiên An", specialty: "Thần kinh", rating: 4.5 },
        {
          name: "BS. Nguyễn Thúc Thùy Tiên",
          specialty: "Chấn thương chỉnh hình",
          rating: 4.6,
        },
        { name: "BS. Hằng Du Mục", specialty: "Tiêu hóa", rating: 4.7 },
        { name: "BS. Lê Linh Liêm Sĩ", specialty: "Ung bướu", rating: 4.8 },
      ],
      // ... thêm trang khác
    ];
    setAllDoctors(allDoctorsData);

    // Lấy bác sĩ trang hiện tại
    setTimeout(() => {
      const index = (currentPage - 1) % allDoctorsData.length;
      setDoctors(allDoctorsData[index]);
    }, 300);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Lọc bác sĩ theo từ khóa trên toàn bộ danh sách
  const allDoctorsFlat = allDoctors.flat();
  const filteredDoctors = search
    ? allDoctorsFlat.filter(
        (doctor) =>
            //Tìm kiếm theo tên bác sĩ 
          doctor.name.toLowerCase().includes(search.toLowerCase()) 
        // ||
        // Tìm kiếm theo chuyên khoa
        //   doctor.specialty.toLowerCase().includes(search.toLowerCase())
      )
    : doctors;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <main className="flex-grow px-8 py-6 bg-gray-50">
        <h1 className="text-2xl font-semibold mb-4">Đặt khám bác sĩ</h1>

        {/* Search */}
        <FinderBar search={search} setSearch={setSearch} />

        {/* Doctor cards */}
        <DoctorCards doctors={filteredDoctors} />

        {/* Pagination: ẩn khi đang tìm kiếm */}
        {!search && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
};

export default ServiceDoctorList;
