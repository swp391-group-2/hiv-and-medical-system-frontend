import { anonymousPostApi } from "@/apis/anonymousPost.api";
import ErrorQuery from "@/components/common/error-query";
import Loading from "@/components/common/loading";
import { PostCard } from "@/components/qAndA/post-card";
import { PostForm } from "@/components/qAndA/post-form";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import PostSearchBar from "./post-searchbar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

const PAGE = 0;
const SIZE = 6;

function PostContent() {
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [debouncedValue] = useDebounceValue<string>(search, 500);
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
    refetch,
    error,
  } = useQuery({
    queryKey: ["posts", page, debouncedValue],
    queryFn: async () => {
      const response = await anonymousPostApi.getAnonymousPosts(
        page || PAGE,
        SIZE,
        debouncedValue
      );
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  if (isError) {
    return (
      <ErrorQuery message={error.message} error={error} onRetry={refetch} />
    );
  }
  if (!posts) {
    return (
      <div className="text-center py-8">Không có câu hỏi nào được tìm thấy</div>
    );
  }

  return (
    <section>
      <div className="container mx-auto mt-8 ">
        <div className="flex justify-center mb-6">
          <PostSearchBar
            value={search}
            onChange={setSearch}
            onReload={refetch}
          />
        </div>
        <div className="grid grid-cols-12 gap-8 ">
          <div className="max-w-3xl w-full col-span-7  space-y-6">
            <div className="space-y-4 ">
              {posts.data.length > 0 ? (
                posts.data.map((post) => (
                  <PostCard
                    key={post.anonymousPostId}
                    post={post}
                    showComments={
                      showComments["" + post.anonymousPostId] || false
                    }
                    onToggleComments={handleToggleComments}
                  />
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      Chưa có câu hỏi nào
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Hãy là người đầu tiên đặt câu hỏi và bắt đầu cuộc thảo
                      luận!
                    </p>
                  </div>
                </div>
              )}
              <div className="mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                        className={
                          page === 0
                            ? "pointer-events-none opacity-50"
                            : "cursor-pointer"
                        }
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink isActive>{page + 1}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setPage((prev) => prev + 1)}
                        className="cursor-pointer"
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </div>
          <div className="col-span-5 ">
            <div className="sticky w-full top-20">
              <PostForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PostContent;
