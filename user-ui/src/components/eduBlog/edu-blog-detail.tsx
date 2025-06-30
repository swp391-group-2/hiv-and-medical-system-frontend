import { eduBlogApi } from "@/apis/blogEdu.api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";

import { User, Hash, Clock } from "lucide-react";
import { useParams } from "react-router-dom";

export default function EduBlogDetail() {
  const { blogId } = useParams<{ blogId: string }>();
  const {
    data: blog,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blogEdu", blogId],
    queryFn: async () => {
      const response = await eduBlogApi.getBlogById(Number(blogId));
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  if (error) {
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
          Không thể tải bài viết. Vui lòng thử lại sau.
        </p>
      </div>
    );
  }

  // Format content paragraphs
  const formatContent = (text: string) => {
    return text.split("\n\n").map((paragraph, index) => {
      if (paragraph.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-2xl font-bold text-gray-800 mt-8 mb-4 border-l-4 border-blue-500 pl-4"
          >
            {paragraph.replace("## ", "")}
          </h2>
        );
      }

      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
          {paragraph}
        </p>
      );
    });
  };

  if (!blog || !blog.data) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-gray-500">Không tìm thấy bài viết.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-5">
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-primary to-sky-700 text-white p-8 rounded-t-lg">
            <div className="flex items-center justify-between gap-3 mb-4">
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-0"
              >
                <Hash className="w-3 h-3 mr-1" />
                {blogId}
              </Badge>
              <div className="flex items-center gap-2 text-blue-100">
                <Clock className="w-4 h-4" />
                <span className="font-medium">
                  {new Date(blog?.data.createdAt).toLocaleString("vi")}
                </span>
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-4 leading-tight">
              {blog?.data.title}
            </h1>

            <p className="text-blue-100 text-xl leading-relaxed mb-6">
              {blog?.data.snippet}
            </p>

            <div className="flex items-center gap-2 text-blue-100">
              <User className="w-4 h-4" />
              <span className="font-medium">{blog?.data.author}</span>
            </div>
          </div>

          {blog?.data.urlImage && (
            <div className="px-8 py-4">
              <img
                src={blog?.data.urlImage}
                alt={blog?.data.title}
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              {formatContent(blog?.data.content || "")}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
