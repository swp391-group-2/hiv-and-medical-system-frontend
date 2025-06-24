import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Trash2, Dot } from "lucide-react";
import type { Doctor } from "@/types/doctor";
export function DoctorRow({
  doctor,
  handleDeleteDoctor,
}: {
  doctor: Doctor;
  handleDeleteDoctor: (id: string) => void;
}) {
  return (
    <TableRow>
      <TableCell>{doctor.doctorCode}</TableCell>
      <TableCell>{doctor.fullName}</TableCell>
      <TableCell>{doctor.email}</TableCell>
      <TableCell>{doctor.specialization}</TableCell>
      <TableCell>{doctor.licenseNumber}</TableCell>
      <TableCell>
        {doctor.userStatus === "active" ? (
          <Dot
            className="cursor-pointer ml-5"
            size={16}
            strokeWidth={16}
            color="#34D399"
          />
        ) : (
          <Dot
            className="cursor-pointer ml-5"
            size={16}
            strokeWidth={16}
            color="#EF4444"
          />
        )}
      </TableCell>
      <TableCell className="flex items-center gap-2">
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
      </TableCell>
    </TableRow>
  );
}
