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
import { Plus, Search, UserCheck } from "lucide-react";
import { CreateDoctorForm } from "@/components/manager/create-doctor-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import http from "@/api/http";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { DoctorList } from "@/components/manager/doctor-list";
import { useDoctors, useDoctorsCount } from "@/api/doctor";
import { LoadingOverlay } from "@/components/loading-overlay";

// export const doctors: Doctor[] = [
//   {
//     doctorId: "doc-001",
//     userId: "user-101",
//     email: "anna.nguyen@example.com",
//     fullName: "Dr. Anna Nguyễn",
//     userStatus: "active",
//     doctorCode: "AN001",
//     specialization: "Truyền nhiễm",
//     licenseNumber: "LIC-2025-0456",
//     urlImage: "https://example.com/images/doctors/anna_nguyen.jpg",
//   },
//   {
//     doctorId: "doc-002",
//     userId: "user-102",
//     email: "john.smith@example.com",
//     fullName: "Dr. John Smith",
//     userStatus: "active",
//     doctorCode: "JS002",
//     specialization: "Da liễu",
//     licenseNumber: "LIC-2024-1123",
//     urlImage: "https://example.com/images/doctors/john_smith.jpg",
//   },
//   {
//     doctorId: "doc-003",
//     userId: "user-103",
//     email: "mei.li@example.com",
//     fullName: "Dr. Mei Lì",
//     userStatus: "inactive",
//     doctorCode: "ML003",
//     specialization: "Nhi khoa",
//     licenseNumber: "LIC-2023-0789",
//     urlImage: "https://example.com/images/doctors/mei_li.jpg",
//   },
//   {
//     doctorId: "doc-004",
//     userId: "user-104",
//     email: "carlos.ramirez@example.com",
//     fullName: "Dr. Carlos Ramírez",
//     userStatus: "active",
//     doctorCode: "CR004",
//     specialization: "Thần kinh",
//     licenseNumber: "LIC-2025-0234",
//     urlImage: "https://example.com/images/doctors/carlos_ramirez.jpg",
//   },
//   {
//     doctorId: "doc-005",
//     userId: "user-105",
//     email: "aisha.khan@example.com",
//     fullName: "Dr. Aisha Khan",
//     userStatus: "active",
//     doctorCode: "AK005",
//     specialization: "Miễn dịch học",
//     licenseNumber: "LIC-2022-3345",
//     urlImage: "https://example.com/images/doctors/aisha_khan.jpg",
//   },
// ];

const ManagerDoctors = () => {
  const queryClient = useQueryClient();
  const { data: doctors, isLoading } = useDoctors();
  const [search, setSearch] = useState("");
  const { data: doctorsCount } = useDoctorsCount();
  const filteredDoctors = (doctors ?? []).filter((doctor) =>
    doctor.fullName.toLowerCase().includes(search.toLowerCase())
  );

  const { mutate: deleteDoctor } = useMutation<void, AxiosError, string>({
    mutationFn: async (doctorId) => await http.delete(`doctors/${doctorId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      toast.success("Xoá thành công.");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleDeleteDoctor = (id: string) => {
    deleteDoctor(id);
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
        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm bác sĩ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Tổng bác sĩ</p>
                <p className="text-2xl font-bold">{doctorsCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <UserCheck className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">
                  Số tài khoản đang hoạt động
                </p>
                <p className="text-2xl font-bold">{}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/*  */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách Bác sĩ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <DoctorList
                data={filteredDoctors}
                handleDeleteDoctor={handleDeleteDoctor}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagerDoctors;
