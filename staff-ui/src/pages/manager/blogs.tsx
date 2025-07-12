import { useBlogList } from "@/api/blog";
import { LoadingOverlay } from "@/components/loading-overlay";
import { EmptyListMessage } from "@/components/page-message";
// import { Button } from "@/components/ui/button";
import type { Blog } from "@/types/blog";
// import { Plus } from "lucide-react";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";

const BlogCard = ({ blog }: { blog: Blog }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Hiển thị hình ảnh nếu có và không bị lỗi */}
      {blog.urlImage && !imageError ? (
        <img
          src={blog.urlImage}
          alt={blog.title}
          className="w-full h-48 object-cover"
          onError={handleImageError}
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500 text-sm">
            {blog.urlImage ? "Không thể tải hình ảnh" : "Không có hình ảnh"}
          </span>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-sm text-gray-600 mb-3">{blog.author}</p>
        <p className="text-gray-700 text-base mb-4 line-clamp-3">
          {blog.snipper}
        </p>
        <a
          href={`/manager/blogs/${blog.blogId}`}
          className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
        >
          Chi tiết &rarr;
        </a>
      </div>
    </div>
  );
};

const ManagerBlogs = () => {
  const { data: blogList = [], isLoading } = useBlogList(0, 5);
  // const navigate = useNavigate();

  if (isLoading) {
    return <LoadingOverlay message="Đang tải" />;
  }

  return (
    <div className="min-h-[100%] flex flex-col py-8">
      <div className="container flex flex-col px-4 grow">
        <header className="mb-8 flex justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Quản lý bài viết</h1>
          {/* <Button
            className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200"
            onClick={() => navigate("/manager/blogs/create")}
          >
            <Plus /> Tạo bài viết mới
          </Button> */}
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogList.length === 0 ? (
            <EmptyListMessage message="Chưa có bài viết nào." />
          ) : (
            blogList.map((blog: Blog) => (
              <BlogCard key={blog.blogId} blog={blog} />
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default ManagerBlogs;
