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

const doctors = [
  {
    id: 1,
    name: "BS. Nguyễn Văn A",
    specialty: "Nhiễm khuẩn",
    department: "Khoa Nội",
    schedule: "Thứ 2,4,6 (8:00-17:00)",
    experience: "10 năm",
    rating: 4.8,
    patientsToday: 12,
    totalPatients: 1250,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "BS. Trần Thị B",
    specialty: "Nội khoa",
    department: "Khoa Nội",
    schedule: "Thứ 3,5,7 (8:00-17:00)",
    experience: "8 năm",
    rating: 4.6,
    patientsToday: 8,
    totalPatients: 980,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "BS. Lê Văn C",
    specialty: "Da liễu",
    department: "Khoa Da liễu",
    schedule: "Thứ 2-6 (13:00-18:00)",
    experience: "12 năm",
    rating: 4.9,
    patientsToday: 15,
    totalPatients: 1580,
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const ManagerDoctors = () => {
  const [search, setSearch] = useState("");
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
    </div>
  );
};

export default ManagerDoctors;
