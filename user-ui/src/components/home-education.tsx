import { Link } from "react-router-dom";
import EducationCard from "./education-card";
import { Button } from "./ui/button";
import { eduBlogs } from "@/raw-data/hiv-edu-data";

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
