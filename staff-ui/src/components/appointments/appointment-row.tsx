import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { PatientCell } from "./patient-cell";
import { StatusBadge } from "./status-badge";
import type { Appointment, AppointmentStatus } from "@/types/types";
import { CheckinEllipsis } from "./checkin-ellipsis";
import { OngoingEllipsis } from "./ongoing-ellipsis";
import { FinishedEllipsis } from "./finished-ellipsis";
import { formatDMY } from "@/lib/utils";
export function AppointmentRow({
  appt,
  status,
}: {
  appt: Appointment;
  status: AppointmentStatus;
}) {
  return (
    <TableRow>
      <TableCell>{appt.appointmentId}</TableCell>
      <TableCell>
        <PatientCell
          name={appt.patient.fullName}
          phone={appt.patient.phoneNumber}
        />
      </TableCell>
      <TableCell>{appt.serviceType}</TableCell>
      <TableCell>{formatDMY(appt.date)}</TableCell>
      <TableCell>{appt.startTime}</TableCell>
      <TableCell>{appt.doctorName}</TableCell>
      <TableCell>
        <StatusBadge status={appt.status} />
      </TableCell>
      <TableCell className="flex items-center gap-2">
        <Button className="cursor-pointer" variant="ghost" size="icon">
          <Phone className="w-4 h-4" />
        </Button>
        {/* ellipses */}
        {status === "SCHEDULED" && <CheckinEllipsis appt={appt} />}
        {(status === "CHECKED_IN" || status === "LAB_COMPLETED") && (
          <OngoingEllipsis appt={appt} />
        )}
        {status === "COMPLETED" && <FinishedEllipsis appt={appt} />}
      </TableCell>
    </TableRow>
  );
}
