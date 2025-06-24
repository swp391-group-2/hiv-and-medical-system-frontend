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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const ManagerDoctors = () => {
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
    </div>
  );
};

export default ManagerDoctors;
