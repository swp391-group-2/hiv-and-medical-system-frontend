import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { PatientCell } from "../appointments/patient-cell";
import { ResultStatusBadge } from "../appointments/status-badge";
import type { Appointment } from "@/types/types";
import { formatDMY } from "@/lib/utils";
import { LabEllipsis } from "./lab-ellipsis";
export function LabRow({ appt }: { appt: Appointment }) {
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
        <ResultStatusBadge status={appt.labResult.resultStatus} />
      </TableCell>
      <TableCell className="flex items-center gap-2">
        <Button className="cursor-pointer" variant="ghost" size="icon">
          <Phone className="w-4 h-4" />
        </Button>
        {/* ellipses */}
        <LabEllipsis appt={appt} />
      </TableCell>
    </TableRow>
  );
}
