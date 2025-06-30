import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, ShieldX, ShieldCheck } from "lucide-react";
import { type Doctor } from "@/types/doctor";
import { DeleteDoctorDialog } from "./DisableDoctorDialog";
import { ActiveDoctorDialog } from "./ActiveDoctorDialog";
import { options } from "../manager/specialization-select";

interface DoctorTableProps {
  doctors: Doctor[];
  onEditClick: (doctor: Doctor) => void;
}

export const DoctorTable = ({ doctors, onEditClick }: DoctorTableProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [activeDialogOpen, setActiveDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleDeleteClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setDeleteDialogOpen(true);
  };

  const handleActiveClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setActiveDialogOpen(true);
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead>Mã bác sĩ</TableHead> */}
            <TableHead>Họ và tên</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Chuyên khoa</TableHead>
            <TableHead>Số giấy phép</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                Chưa có bác sĩ nào trong hệ thống
              </TableCell>
            </TableRow>
          ) : (
            doctors.map((doctor: Doctor) => (
              <TableRow key={doctor.doctorId}>
                {/* <TableCell className="font-medium">
                  {doctor.doctorCode}
                </TableCell> */}
                <TableCell>{doctor.fullName}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>
                  {
                    options.find(
                      (option) => option.id === doctor.specialization
                    )?.name
                  }
                </TableCell>
                <TableCell>{doctor.licenseNumber}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      doctor.userStatus === "ACTIVE" ? "default" : "secondary"
                    }
                  >
                    {doctor.userStatus === "ACTIVE"
                      ? "Hoạt động"
                      : "Không hoạt động"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditClick(doctor)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    {doctor.userStatus === "ACTIVE" ? (
                      <Button
                        className="text-red-600 hover:text-red-700"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(doctor)}
                      >
                        <ShieldX className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleActiveClick(doctor)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <ShieldCheck className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Delete Doctor Dialog */}
      {selectedDoctor && (
        <DeleteDoctorDialog
          doctor={selectedDoctor}
          isOpen={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        />
      )}

      {/* Active Doctor Dialog */}
      {selectedDoctor && (
        <ActiveDoctorDialog
          doctor={selectedDoctor}
          isOpen={activeDialogOpen}
          onOpenChange={setActiveDialogOpen}
        />
      )}
    </div>
  );
};
