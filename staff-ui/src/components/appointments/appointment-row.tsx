import { TableRow, TableCell } from "@/components/ui/table";
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
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, MoreHorizontal } from "lucide-react";
import { PatientCell } from "./patient-cell";
import { NoteBadge } from "./note-badge";
import type { Appointment } from "@/types/types";
import { InfoGroup, InfoTextRow } from "@/components/info-text";
import { useState } from "react";
import { ConfirmCheckinDialog } from "@/components/appointments/confirm-checkin";

export function AppointmentRow({ appt }: { appt: Appointment }) {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  function handleConfirm() {}
  return (
    <TableRow>
      <TableCell>{appt.id}</TableCell>
      <TableCell>
        <PatientCell name={appt.patientName} phone={appt.patientPhone} />
      </TableCell>
      <TableCell>{appt.type}</TableCell>
      <TableCell>{appt.date}</TableCell>
      <TableCell>{appt.time}</TableCell>
      <TableCell>{appt.doctor}</TableCell>
      <TableCell>
        <NoteBadge hasNote={appt.hasNote} />
      </TableCell>
      <TableCell className="flex items-center gap-2">
        <Button className="cursor-pointer" variant="ghost" size="icon">
          <Phone className="w-4 h-4" />
        </Button>
        {/* ellipses */}
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
                setConfirm(true);
              }}
            >
              {/*TO DO: check-in method */}
              Check-In Bệnh Nhân
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
              <InfoGroup>
                <InfoTextRow label="Nơi khám" data="Cơ sở HIV" />
              </InfoGroup>
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="bg-blue-500 hover:bg-blue-600 cursor-pointer">
                    Đóng
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <ConfirmCheckinDialog
            open={confirm}
            setOpen={setConfirm}
            patientName=""
            onConfirm={handleConfirm}
          />
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
