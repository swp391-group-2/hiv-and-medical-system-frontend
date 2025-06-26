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
import { Edit } from "lucide-react";
import { type Doctor } from "@/types/doctor";

interface DoctorTableProps {
  doctors: Doctor[];
  onEditClick: (doctor: Doctor) => void;
}

export const DoctorTable = ({ doctors, onEditClick }: DoctorTableProps) => {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã bác sĩ</TableHead>
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
                <TableCell className="font-medium">
                  {doctor.doctorCode}
                </TableCell>
                <TableCell>{doctor.fullName}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditClick(doctor)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
