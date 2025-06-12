import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
} from "@/components/ui/table";
import type { Appointment } from "@/types/types";
import { CheckinRow } from "@/components/appointments/checkin-row";
import { EmptyListMessage } from "@/components/page-message";

export function AppointmentTable({ data }: { data: Appointment[] }) {
  if (data.length == 0) {
    return <EmptyListMessage message="Không có lịch hẹn nào đang chờ" />;
  }
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
          <TableHead>Trạng thái</TableHead>
          <TableHead>Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((appt) => (
          <CheckinRow key={appt.id} appt={appt} />
        ))}
      </TableBody>
    </Table>
  );
}
