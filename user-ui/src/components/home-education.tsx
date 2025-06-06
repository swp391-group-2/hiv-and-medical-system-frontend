import { Link } from "react-router-dom";
import EducationCard from "./education-card";
import { Button } from "./ui/button";

const eduBlogs = [
  {
    id: 1,
    title: "Hiểu đúng về HIV: Kiến thức cơ bản ai cũng nên biết",
    desc: "Tìm hiểu HIV là gì, cách lây truyền và những hiểu lầm phổ biến để bảo vệ bản thân và cộng đồng.",
  },
  {
    id: 2,
    title: "Phòng ngừa HIV hiệu quả: Những điều đơn giản nhưng quan trọng",
    desc: "Khám phá các biện pháp phòng tránh HIV an toàn, khoa học và dễ thực hiện trong đời sống hằng ngày.",
  },
  {
    id: 3,
    title: "Sống chung với HIV: Hoàn toàn có thể sống khỏe mạnh",
    desc: "Câu chuyện và kiến thức dành cho người sống chung với HIV – từ điều trị đến chăm sóc sức khỏe tinh thần.",
  },
  {
    id: 4,
    title: "Xét nghiệm HIV: Khi nào và ở đâu cần kiểm tra",
    desc: "Hướng dẫn chi tiết về quy trình xét nghiệm HIV, thời điểm thích hợp và địa điểm xét nghiệm đáng tin cậy.",
  },
  {
    id: 5,
    title: "Hỗ trợ tâm lý cho người nhiễm HIV và gia đình",
    desc: "Cách đối phó với căng thẳng, lo lắng và tìm kiếm sự hỗ trợ từ cộng đồng và gia đình.",
  },
  {
    id: 6,
    title: "Điều trị HIV hiện đại: Thuốc ARV và cuộc sống bình thường",
    desc: "Tìm hiểu về liệu pháp kháng retrovirus, tác dụng phụ và cách duy trì chất lượng cuộc sống tốt.",
  },
];

function HomeEducation() {
  return (
    <div>
      <section>
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className=" text-4xl font-bold mb-2.5">
              Tài Liệu Giáo Dục HIV
            </h2>
            <p className="inline-block w-[50%] text-lg   text-gray-400">
              Khám phá bộ sưu tập tài liệu giáo dục toàn diện về HIV/AIDS được
              biên soạn bởi các chuyên gia y tế hàng đầu
            </p>
          </div>
          <div className="grid grid-cols-12 gap-8 mt-8">
            {eduBlogs.map((eduBlog) => (
              <div key={eduBlog.id} className="col-span-4">
                <EducationCard title={eduBlog.title} desc={eduBlog.desc} />
              </div>
            ))}
          </div>
          <div className="mt-5 text-center ">
            <Link to="education">
              <Button className=" px-10 text-lg" size="lg">
                Xem Thêm...
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeEducation;
