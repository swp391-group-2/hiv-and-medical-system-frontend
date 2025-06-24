import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Search,
  Edit,
  Calendar,
  UserCheck,
  Clock,
  Star,
  Trash2,
} from "lucide-react";
import { CreateDoctorForm } from "@/components/manager/create-doctor-form";
import type { Doctor } from "@/types/doctor";

export const doctors: Doctor[] = [
  {
    doctorId: "doc-001",
    userId: "user-101",
    email: "anna.nguyen@example.com",
    fullName: "Dr. Anna Nguyễn",
    userStatus: "active",
    doctorCode: "AN001",
    specialization: "Truyền nhiễm",
    licenseNumber: "LIC-2025-0456",
    urlImage: "https://example.com/images/doctors/anna_nguyen.jpg",
  },
  {
    doctorId: "doc-002",
    userId: "user-102",
    email: "john.smith@example.com",
    fullName: "Dr. John Smith",
    userStatus: "active",
    doctorCode: "JS002",
    specialization: "Da liễu",
    licenseNumber: "LIC-2024-1123",
    urlImage: "https://example.com/images/doctors/john_smith.jpg",
  },
  {
    doctorId: "doc-003",
    userId: "user-103",
    email: "mei.li@example.com",
    fullName: "Dr. Mei Lì",
    userStatus: "inactive",
    doctorCode: "ML003",
    specialization: "Nhi khoa",
    licenseNumber: "LIC-2023-0789",
    urlImage: "https://example.com/images/doctors/mei_li.jpg",
  },
  {
    doctorId: "doc-004",
    userId: "user-104",
    email: "carlos.ramirez@example.com",
    fullName: "Dr. Carlos Ramírez",
    userStatus: "active",
    doctorCode: "CR004",
    specialization: "Thần kinh",
    licenseNumber: "LIC-2025-0234",
    urlImage: "https://example.com/images/doctors/carlos_ramirez.jpg",
  },
  {
    doctorId: "doc-005",
    userId: "user-105",
    email: "aisha.khan@example.com",
    fullName: "Dr. Aisha Khan",
    userStatus: "active",
    doctorCode: "AK005",
    specialization: "Miễn dịch học",
    licenseNumber: "LIC-2022-3345",
    urlImage: "https://example.com/images/doctors/aisha_khan.jpg",
  },
];

const ManagerDoctors = () => {
  const [search, setSearch] = useState("");

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.fullName.toLowerCase().includes(search.toLowerCase())
  );

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
                <p className="text-2xl font-bold">{doctors.length}</p>
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
            {filteredDoctors.map((doctor) => (
              <div key={doctor.doctorId} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={doctor.urlImage || "/placeholder.svg"}
                      />
                      <AvatarFallback>
                        {doctor.fullName.split(" ").pop()?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-lg">{doctor.fullName}</h3>
                      <p className="text-sm text-gray-600">
                        {doctor.specialization}
                      </p>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">5.0/5.0</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteDoctor(doctor.doctorId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Lịch làm việc
                    </p>
                    <p className="text-sm text-gray-600">{}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Kinh nghiệm
                    </p>
                    <p className="text-sm text-gray-600">{}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Bệnh nhân hôm nay
                    </p>
                    <Badge variant="secondary">{} bệnh nhân</Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Tổng bệnh nhân
                    </p>
                    <p className="text-sm text-gray-600">{}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagerDoctors;
