import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
} from "@/components/ui/table";
import type { Appointment } from "@/types/types";
import { EmptyListMessage } from "@/components/page-message";
import { LabRow } from "./lab-row";

export function LabTable({ data }: { data: Appointment[] }) {
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
          <TableHead>Trạng thái kết quả</TableHead>
          <TableHead>Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((appt) => (
          <LabRow key={appt.appointmentId} appt={appt} />
        ))}
      </TableBody>
    </Table>
  );
}
