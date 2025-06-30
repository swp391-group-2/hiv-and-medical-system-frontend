import EduBlogList from "@/components/eduBlog/edu-blog-list";
import { EduBlogSearchBar } from "@/components/eduBlog/edu-blog-searchbar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

import { useDebounceValue } from "usehooks-ts";
const EducationPage = () => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [debouncedValue] = useDebounceValue<string>(search, 500);

  return (
    <div className="container mx-auto flex flex-col ">
      <main className="  py-6 ">
        <div className="relative bg-gradient-to-br from-primary to-sky-200 rounded-2xl p-8 md:p-12 mb-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full opacity-20 -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-sky-300 rounded-full opacity-30 translate-y-12 -translate-x-12"></div>

          <div className="relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Bài viết giáo dục
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded mx-auto mb-6"></div>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Khám phá những kiến thức về HIV hữu ích và cập nhật thông tin sức
              khỏe mới nhất từ các chuyên gia hàng đầu trong lĩnh HIV/AIDS
            </p>
            <div className="flex items-center justify-center  mt-6 space-x-4 text-md text-gray-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span>Thông tin chính xác</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span>Cập nhật thường xuyên</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                <span>Dễ hiểu</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-8">
          <EduBlogSearchBar value={search} onChange={setSearch} />
        </div>
        <div className="mt-8 ">
          <EduBlogList search={debouncedValue} page={page} />
        </div>
        <div>
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
      </main>
    </div>
  );
};

export default EducationPage;
