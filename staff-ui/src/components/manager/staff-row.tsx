import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Dot } from "lucide-react";
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
import type { Staff } from "@/types/staff";

export function StaffRow({
  staff,
  handleDeleteStaff,
}: {
  staff: Staff;
  handleDeleteStaff: (id: string) => void;
}) {
  return (
    <TableRow>
      <TableCell>{staff.staffCode}</TableCell>
      <TableCell>{staff.fullName}</TableCell>
      <TableCell>{staff.email}</TableCell>
      <TableCell>{staff.role}</TableCell>
      <TableCell>{staff.status}</TableCell>
      <TableCell>
        <HoverCard openDelay={200} closeDelay={200}>
          <HoverCardTrigger>
            {staff.status === "active" ? (
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
              {staff.status === "active"
                ? "Tài khoản đang hoạt động"
                : "Tài khoản bị vô hiệu hoá"}
            </div>
          </HoverCardContent>
        </HoverCard>
      </TableCell>
      <TableCell className="grid grid-cols-3 items-center gap-4">
        <Tooltip delayDuration={500}>
          <TooltipTrigger>
            <Button
              className="cursor-pointer w-full"
              variant="outline"
              size="sm"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Chỉnh sửa thông tin</p>
          </TooltipContent>
        </Tooltip>

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
              <AlertDialogTitle>Xác nhận xoá nhân viên</AlertDialogTitle>
              <AlertDialogDescription>
                Hành động này không thể hoàn tác. Bạn có chắc muốn xoá nhân viên
                này không?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer ">
                Huỷ
              </AlertDialogCancel>
              <AlertDialogAction
                className="cursor-pointer bg-red-500 hover:bg-red-600"
                onClick={() => handleDeleteStaff(staff.staffId)}
              >
                Xoá
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
}
