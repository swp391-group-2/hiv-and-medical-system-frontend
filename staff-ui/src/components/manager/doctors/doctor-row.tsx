import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, Trash2, Dot, Loader2 } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DoctorUpdateForm } from "./doctor-update-form";
import { options } from "../specialization-select";
import { ScheduleMutateForm } from "./schedule-form";
import { CurrentSchedule } from "./current-schedule";

export function DoctorRow({
  doctor,
  handleDeleteDoctor,
  isDeleting,
}: {
  doctor: Doctor;
  handleDeleteDoctor: (id: string) => void;
  isDeleting: boolean;
}) {
  return (
    <TableRow>
      <TableCell>{doctor.doctorCode}</TableCell>
      <TableCell>{doctor.fullName}</TableCell>
      <TableCell>{doctor.email}</TableCell>
      <TableCell>
        {options.find((option) => option.id === doctor.specialization)?.name}
      </TableCell>
      <TableCell>{doctor.licenseNumber}</TableCell>
      <TableCell>
        <HoverCard openDelay={200} closeDelay={200}>
          <HoverCardTrigger>
            {doctor.userStatus === "ACTIVE" ? (
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
              {doctor.userStatus === "ACTIVE"
                ? "Tài khoản đang hoạt động"
                : "Tài khoản bị vô hiệu hoá"}
            </div>
          </HoverCardContent>
        </HoverCard>
      </TableCell>
      <TableCell className="grid grid-cols-3 items-center gap-4">
        <Dialog>
          <Tooltip delayDuration={500}>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button
                  className="cursor-pointer w-full"
                  variant="outline"
                  size="sm"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chỉnh sửa thông tin</p>
            </TooltipContent>
          </Tooltip>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cập nhật thông tin</DialogTitle>
            </DialogHeader>
            {/* form update doctor */}
            <DoctorUpdateForm doctor={doctor} />
          </DialogContent>
        </Dialog>

        {/* work schedule */}
        <Dialog>
          <Tooltip delayDuration={500}>
            <TooltipTrigger>
              <DialogTrigger asChild>
                <Button
                  className="cursor-pointer w-full"
                  variant="outline"
                  size="sm"
                >
                  <Calendar className="h-4 w-4" />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Lịch làm việc</p>
            </TooltipContent>
          </Tooltip>
          <DialogPortal>
            <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !w-[80vw] !h-[90vh] !max-w-none !max-h-none flex flex-col justify-between">
              <DialogHeader>
                <DialogTitle>
                  Cập nhật lịch làm việc:{" "}
                  <span className="text-blue-800 pl-4 text-xl">
                    {doctor.fullName}
                  </span>
                </DialogTitle>
              </DialogHeader>
              {/* form update doctor */}
              <CurrentSchedule />
            </DialogContent>
          </DialogPortal>
        </Dialog>

        {/* confirm delete */}

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xác nhận xoá bác sĩ</AlertDialogTitle>
              <AlertDialogDescription>
                Hành động này không thể hoàn tác. Bạn có chắc muốn xoá bác sĩ
                này không?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer ">
                Huỷ
              </AlertDialogCancel>
              <AlertDialogAction
                asChild
                className="cursor-pointer bg-red-500 hover:bg-red-600"
                onClick={() => handleDeleteDoctor(doctor.doctorId)}
              >
                <Button variant="destructive">
                  {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang xử
                      lý...
                    </>
                  ) : (
                    "Xoá"
                  )}
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
}
