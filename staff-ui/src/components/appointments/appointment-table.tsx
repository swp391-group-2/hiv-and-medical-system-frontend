import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
} from "@/components/ui/table";
import type { Appointment } from "@/types/types";
import { AppointmentRow } from "@/components/appointments/appointment-row";

export function AppointmentTable({ data }: { data: Appointment[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Bệnh nhân</TableHead>
          <TableHead>Loại khám</TableHead>
          <TableHead>Ngày</TableHead>
          <TableHead>Giờ</TableHead>
          <TableHead>Bác sĩ</TableHead>
          <TableHead>Ghi chú</TableHead>
          <TableHead>Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((appt) => (
          <AppointmentRow key={appt.id} appt={appt} />
        ))}
      </TableBody>
    </Table>
  );
}
