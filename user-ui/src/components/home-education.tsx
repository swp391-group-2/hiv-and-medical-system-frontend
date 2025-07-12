import { Link } from "react-router-dom";

import { Button } from "./ui/button";
import EduTopList from "./eduBlog/edu-top-list";

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
          <div className="mt-8">
            <EduTopList />
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
