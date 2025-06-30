import { anonymousPostApi } from "@/apis/anonymousPost.api";
import { PostCard } from "@/components/qAndA/post-card";
import { PostForm } from "@/components/qAndA/post-form";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function QAndA() {
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});
  const handleToggleComments = (postId: string) => {
    setShowComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await anonymousPostApi.getAnonymousPosts();
      return response.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-8">Đang tải...</div>;
  }
  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">Lỗi khi tải dữ liệu</div>
    );
  }
  if (!posts?.data || posts.data.length === 0) {
    return <div className="text-center py-8">Không có câu hỏi nào.</div>;
  }

  return (
    <section>
      <div className="bg-gradient-to-r from-primary to-sky-300 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hỏi Đáp Y Tế</h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Đặt câu hỏi ẩn danh và nhận được tư vấn từ các chuyên gia y tế
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Đặt Câu Hỏi
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
              Xem Câu Hỏi Phổ Biến
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 ">
        <div className="grid grid-cols-12 gap-8 ">
          <div className="max-w-3xl w-full col-span-7  space-y-6">
            <div className="space-y-4 ">
              {posts.data.map((post) => (
                <PostCard
                  key={post.anonymousPostId}
                  post={post}
                  showComments={
                    showComments["" + post.anonymousPostId] || false
                  }
                  onToggleComments={handleToggleComments}
                />
              ))}
            </div>
          </div>
          <div className="col-span-5 ">
            <div className="sticky w-full top-20">
              <PostForm
                onSubmit={(data) => console.log("New post submitted:", data)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QAndA;
