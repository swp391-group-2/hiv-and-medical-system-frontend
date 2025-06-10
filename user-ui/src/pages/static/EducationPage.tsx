import FinderBarEdu from "@/components/InformationPageUser/EduFinderbar";
import EduCardsUser from "@/components/InformationPageUser/EduCardUser";
import PaginationEdu from "@/components/InformationPageUser/EduPagination";
import React, { useState, useEffect } from "react";

type Post = {
  title: string;
  content: string;
  image?: string;
};

const PAGE_SIZE = 3;

const EducationPage: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Giả lập dữ liệu bài viết
    setAllPosts([
      {
        title: "Hiểu về HIV/AIDS: Những điều cơ bản bạn cần biết",
        content:
          "HIV là virus gây suy giảm miễn dịch ở người. Tìm hiểu về cách lây truyền, phòng ngừa và điều trị HIV/AIDS.",
        image: "https://ksbtdanang.vn/uploads/chuyen-mon/2020_12/image-20201210085705-1.jpg",
      },
      {
        title: "Sống khỏe mạnh với HIV: Chế độ dinh dưỡng và tập luyện",
        content:
          "Chế độ dinh dưỡng và tập luyện đóng vai trò quan trọng trong việc duy trì sức khỏe cho người sống chung với HIV.",
        image: "https://datafiles.nghean.gov.vn/nan-ubnd/2882/quantritintuc20243/z5289686210630_875c4d2898c2999b5bb4adbfa131c50f638471506286640838.jpg",
      },
      {
        title: "Thuốc ARV và tầm quan trọng của việc tuân thủ điều trị",
        content:
          "Hiểu về thuốc kháng retrovirus (ARV) và tại sao việc tuân thủ điều trị đúng cách lại quan trọng đến vậy.",
        image: "https://www.glinkvn.com/wp-content/uploads/2021/09/ARV_ADHERENCE-100-1024x576.jpeg",
      },
      {
        title: "Phòng tránh lây nhiễm HIV cho cộng đồng",
        content:
          "Các biện pháp phòng tránh lây nhiễm HIV hiệu quả cho bản thân và cộng đồng.",
        image: "https://trungtamytevandon.vn/wp-content/uploads/2024/06/Cac-bien-phap-phong-ngua-HIV-AIDS.jpg",
      },
      {
        title: "Tư vấn tâm lý cho người sống với HIV",
        content:
          "Vai trò của tư vấn tâm lý trong hỗ trợ người sống với HIV vượt qua khó khăn.",
        image: "https://phongkhamnhaminh.com//htdocs/images/owners/phongkhamnhaminh/2022%20-%20B%E1%BA%A1n%20Kh%C3%B4ng%20M%E1%BB%99t%20M%C3%ACnh/suc-khoe-tam-tri-3.png",
      },
      {
        title: "Các dấu hiệu nhận biết sớm nhiễm HIV",
        content:
          "Những dấu hiệu ban đầu giúp nhận biết nguy cơ nhiễm HIV để kịp thời xét nghiệm và điều trị.",
        image: "https://medcare.com.vn/wp-content/uploads/2024/11/hiv-aids-symptoms-4014373-final-ct-003ab16aa2f64faa9209cf4e6a71a555-1024x683.png",
      },
    ]);
  }, []);

  // Lọc bài viết theo từ khóa
  const filteredPosts = search
    ? allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.content.toLowerCase().includes(search.toLowerCase())
      )
    : allPosts;

  // Phân trang
  const totalPages = Math.ceil(filteredPosts.length / PAGE_SIZE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="container mx-auto flex flex-col min-h-screen">
      <main className="flex-grow px-8 py-6 bg-gray-50">
        <h1
          className="text-3xl md:text-4xl font-bold text text-center mb-6 tracking-tight"
          style={{ textShadow: "0 2px 8px #e0e7ef" }}
        >
          Bài viết giáo dục
        </h1>
        <div className="w-24 h-1 bg-blue-300 rounded mx-auto mb-8"></div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-2 mb-4">
          <FinderBarEdu search={search} setSearch={setSearch} />
        </div>
        <div className="flex justify-center">
          <EduCardsUser posts={paginatedPosts} />
        </div>
        {totalPages > 1 && (
          <PaginationEdu
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </main>
    </div>
  );
};

export default EducationPage;
