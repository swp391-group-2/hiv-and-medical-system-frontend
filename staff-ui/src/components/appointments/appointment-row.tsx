import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Phone, MoreHorizontal } from "lucide-react";
import { PatientCell } from "./patient-cell";
import { NoteBadge } from "./note-badge";
import type { Appointment } from "@/types/types";

export function AppointmentRow({ appt }: { appt: Appointment }) {
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
        <Button variant="ghost" size="icon">
          <Phone className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
