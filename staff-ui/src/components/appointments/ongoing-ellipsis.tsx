import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import type { Appointment } from "@/types/types";
import PatientProfileInfo from "./patient-profile";

export function OngoingEllipsis({ appt }: { appt: Appointment }) {
  const [open, setOpen] = useState(false);
  const [openSession, setOpenSession] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="center">
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            setOpenSession(true);
          }}
        >
          Phiên khám bệnh
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          Xem hồ sơ bệnh nhân
        </DropdownMenuItem>
      </DropdownMenuContent>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[500px] min-h-[550px] flex flex-col justify-between">
          <DialogHeader>
            <DialogTitle>Xem hồ sơ bệnh nhân</DialogTitle>
          </DialogHeader>
          <PatientProfileInfo appt={appt} />
          <DialogFooter>
            <DialogClose asChild>
              <Button className="bg-blue-500 hover:bg-blue-600 cursor-pointer">
                Đóng
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={openSession} onOpenChange={setOpenSession}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Phiên khám bệnh</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="bg-blue-500 hover:bg-blue-600 cursor-pointer">
                Đóng
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  );
}
