import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, RotateCcw, Search, User } from "lucide-react";
import { CreateDoctorForm } from "@/components/manager/doctors/create-doctor-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/api/http";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { DoctorList } from "@/components/manager/doctors/doctor-list";
import { InternalLoading, LoadingOverlay } from "@/components/loading-overlay";
import PaginationComponent from "@/components/pagination";
import { useDoctorsCount, useDoctorsV2 } from "@/api/doctor";

const ManagerDoctorsV2 = () => {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: doctorsData = [], // Renamed to avoid conflict with `doctors` variable below
    isLoading,
    isFetching,
    // isPreviousData, // Useful if you want to show old data while new data loads
  } = useDoctorsV2(currentPage - 1, itemsPerPage);

  const paginatedDoctors = doctorsData;

  const { data: doctorsCount } = useDoctorsCount();

  const totalPages = Math.ceil((doctorsCount ?? 0) / itemsPerPage);
  const filteredDoctors = (paginatedDoctors ?? []).filter((doctor) =>
    doctor.fullName.toLowerCase().includes(search.toLowerCase())
  );
  const { mutate: deleteDoctor, isPending } = useMutation<
    void,
    AxiosError,
    string
  >({
    mutationFn: async (doctorId) => await http.delete(`doctors/${doctorId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });

      if (paginatedDoctors.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      toast.success("Xoá thành công.");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleDeleteDoctor = (id: string) => {
    deleteDoctor(id);
  };

  const handleReLoadList = () => {
    queryClient.invalidateQueries({ queryKey: ["doctors"] });
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) return <LoadingOverlay message="Đang tải dữ liệu" />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Bác sĩ</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center bg-blue-500 hover:bg-blue-600 cursor-pointer">
              <Plus className="h-4 w-4 mr-2" />
              Thêm bác sĩ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Thêm bác sĩ</DialogTitle>
            </DialogHeader>
            <CreateDoctorForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="md:col-span-3">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm bác sĩ..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <User className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Tổng bác sĩ</p>
                <p className="text-2xl font-bold">{doctorsCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Danh sách Bác sĩ</CardTitle>
          <Button
            variant="outline"
            className="bg-white hover:bg-gray-100 cursor-pointer mr-4"
            onClick={handleReLoadList}
          >
            {"Làm mới "}
            <RotateCcw />
          </Button>
        </CardHeader>
        <CardContent>
          {isFetching ? (
            <InternalLoading message="Đang tải" />
          ) : (
            <div className="space-y-4">
              <div className="flex space-x-2">
                <DoctorList
                  data={filteredDoctors} // Pass paginated data from API
                  handleDeleteDoctor={handleDeleteDoctor}
                  isDeleting={isPending}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      {/* Pagination goes here */}
      {totalPages > 0 && (
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ManagerDoctorsV2;
