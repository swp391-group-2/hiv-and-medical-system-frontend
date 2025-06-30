import { Link } from "react-router-dom";
import EducationCard from "./eduBlog/education-card";
import { Button } from "./ui/button";
import { useQuery } from "@tanstack/react-query";
import { eduBlogApi } from "@/apis/blogEdu.api";

const PAGE = 0;
const SIZE = 6;

function HomeEducation() {
  const { data: eduBlogs } = useQuery({
    queryKey: ["eduBlogs", PAGE, SIZE],
    queryFn: async () => {
      const response = await eduBlogApi.getBlogs(PAGE, SIZE);
      return response.data;
    },
  });

  if (!eduBlogs) {
    return (
      <div className="text-center py-8">
        Không có tài liệu giáo dục nào được tìm thấy
      </div>
    );
  }

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
            {eduBlogs.data.length > 0 ? (
              eduBlogs?.data.map((eduBlog) => (
                <div key={eduBlog.blogId} className="col-span-4">
                  <EducationCard
                    title={eduBlog.title}
                    blogId={eduBlog.blogId}
                    author={eduBlog.author}
                    createdAt={eduBlog.createdAt}
                    snippet={eduBlog.snippet}
                    urlImage={eduBlog.urlImage}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-12 flex flex-col items-center justify-center py-16">
                <div className="text-center space-y-6 max-w-lg">
                  <div className="relative">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-12 h-12 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-gray-800">
                      Chưa có tài liệu giáo dục
                    </h3>
                    <p className="text-gray-500 leading-relaxed">
                      Hiện tại chưa có tài liệu giáo dục nào. Chúng tôi đang cập
                      nhật những nội dung hữu ích về HIV/AIDS.
                    </p>
                  </div>
                </div>
              </div>
            )}
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
