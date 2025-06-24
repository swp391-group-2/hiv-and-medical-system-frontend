import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Trash2, Dot } from "lucide-react";
import type { Doctor } from "@/types/doctor";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
        <HoverCard openDelay={200} closeDelay={200}>
          <HoverCardTrigger>
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
          </HoverCardTrigger>
          <HoverCardContent className="flex justify-center">
            <div>
              {doctor.userStatus === "active"
                ? "Tài khoản đang hoạt động"
                : "Tài khoản bị vô hiệu hoá"}
            </div>
          </HoverCardContent>
        </HoverCard>
      </TableCell>
      <TableCell className="grid grid-cols-3 items-center gap-4">
        <Tooltip delayDuration={500}>
          <TooltipTrigger>
            <Button className="cursor-pointer" variant="outline" size="sm">
              <Edit className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Chỉnh sửa thông tin</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={500}>
          <TooltipTrigger>
            <Button className="cursor-pointer" variant="outline" size="sm">
              <Calendar className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Lịch làm việc</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip delayDuration={500}>
          <TooltipTrigger>
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer text-red-500 hover:text-red-700 hover:bg-red-50"
              onClick={() => handleDeleteDoctor(doctor.doctorId)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Xoá bác sĩ</p>
          </TooltipContent>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
