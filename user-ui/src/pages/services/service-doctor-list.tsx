import DoctorHero from "@/components/doctorListPage/doctor-hero";

import FinderBar from "@/components/doctorListPage/FinderBar";

import { useState } from "react";
import DoctorList from "@/components/doctorListPage/doctor-list";
import { useDebounceValue } from "usehooks-ts";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ServiceDoctorList = () => {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [debouncedValue] = useDebounceValue<string>(search, 500);

  return (
    <div>
      <DoctorHero />
      <div className="container mx-auto min-h-screen">
        <main className="px-8 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-primary text-center mb-6 tracking-tight">
            Đặt khám bác sĩ
          </h1>
          <div className="w-24 h-1 bg-blue-300 rounded mx-auto mb-8"></div>
          <div className="flex flex-row gap-4 mb-4">
            <FinderBar search={search} setSearch={setSearch} />
          </div>
          <DoctorList page={page} search={debouncedValue} />
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
        </main>
      </div>
    </div>
  );
};

export default ServiceDoctorList;
