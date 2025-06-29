import { eduBlogApi } from "@/apis/blogEdu.api";
import { useQuery } from "@tanstack/react-query";

import EducationCard from "./education-card";

const PAGE = 0;
const SIZE = 12;

type EduBlogListProps = {
  page?: number;
  search?: string;
};

function EduBlogList({ page = PAGE, search = "" }: EduBlogListProps) {
  const {
    data: eduBlogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["eduBlog", page, SIZE, search],
    queryFn: async () => {
      const response = await eduBlogApi.getBlogs(page, SIZE, search);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 text-lg">Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 mb-4 text-red-400">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-red-600 mb-2">
          Có lỗi xảy ra
        </h3>
        <p className="text-gray-500">
          Không thể tải danh sách bài viết. Vui lòng thử lại sau.
        </p>
      </div>
    );
  }

  if (!eduBlogs?.data || eduBlogs.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-24 h-24 mb-6 text-gray-300">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full"
          >
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          Không tìm thấy bài viết nào
        </h3>
        <p className="text-gray-500 max-w-md">
          {search
            ? `Không có bài viết nào phù hợp với từ khóa "${search}"`
            : "Hiện tại chưa có bài viết giáo dục nào được đăng tải"}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-3 mt-4 gap-8">
        {eduBlogs?.data.map((blog) => (
          <EducationCard
            key={blog.blogId}
            title={blog.title}
            author={blog.author}
            blogId={blog.blogId}
            createdAt={blog.createdAt}
            snippet={blog.snippet}
            urlImage={blog.urlImage}
          />
        ))}
      </div>
    </div>
  );
}

export default EduBlogList;
