import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import StatsBox from "@/components/AnonnymusQA/tagQA";
import AnonymousPostCard from "@/components/AnonnymusQA/AnonymousPostCard";

import { AlertCircle, RefreshCw, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AnonymousPost, StatsItem } from "../../types/qaType";
import { getAnonymousPosts } from "@/api/doctorAnDanhQA";
import { LoadingSpinner } from "@/components/ui/loading";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Questions = () => {
  const [stats, setStats] = useState<StatsItem[]>([
    { label: "Chờ trả lời", count: 0, description: "Câu hỏi mới" },
    { label: "Đã trả lời", count: 0, description: "Đã tư vấn" },
    { label: "Chuyển khoa", count: 0, description: "Cần chuyển khoa" },
    { label: "Tổng câu hỏi", count: 0, description: "Tất cả bài đăng" },
  ]);

  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["anonymous-posts"],
    queryFn: getAnonymousPosts,
    refetchOnWindowFocus: false,
  });

  // Cập nhật stats khi có dữ liệu posts
  useEffect(() => {
    if (posts) {
      const totalPosts = posts.length;
      const answeredPosts = posts.filter(
        (post) => post.comments && post.comments.length > 0
      ).length;
      const unansweredPosts = totalPosts - answeredPosts;

      setStats([
        {
          label: "Chờ trả lời",
          count: unansweredPosts,
          description: "Câu hỏi mới",
        },
        { label: "Đã trả lời", count: answeredPosts, description: "Đã tư vấn" },
        { label: "Chuyển khoa", count: 0, description: "Cần chuyển khoa" },
        {
          label: "Tổng câu hỏi",
          count: totalPosts,
          description: "Tất cả bài đăng",
        },
      ]);
    }
  }, [posts]);

  const handleReplySuccess = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-1">Tư vấn ẩn danh</h1>
        <p className="text-sm text-gray-600 mb-4">
          Trả lời câu hỏi và tư vấn cho bệnh nhân HIV
        </p>
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-1">Tư vấn ẩn danh</h1>
        <p className="text-sm text-gray-600 mb-4">
          Trả lời câu hỏi và tư vấn cho bệnh nhân HIV
        </p>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại.
            <Button
              variant="outline"
              size="sm"
              className="ml-2"
              onClick={() => refetch()}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Thử lại
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Tư vấn ẩn danh</h1>
          <p className="text-sm text-gray-600">
            Trả lời câu hỏi và tư vấn cho bệnh nhân HIV
          </p>
        </div>
        <Button variant="outline" onClick={() => refetch()}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Làm mới
        </Button>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-4 mb-6">
        {stats.map((s) => (
          <StatsBox key={s.label} item={s} />
        ))}
      </div>

      {/* Posts */}
      <div>
        {posts && posts.length > 0 ? (
          posts.map((post: AnonymousPost) => (
            <AnonymousPostCard
              key={post.anonymousPostId}
              post={post}
              onReplySuccess={handleReplySuccess}
            />
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Chưa có câu hỏi nào từ bệnh nhân</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questions;
