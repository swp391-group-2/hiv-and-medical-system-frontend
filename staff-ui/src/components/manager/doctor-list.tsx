import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
} from "@/components/ui/table";
import { EmptyListMessage } from "@/components/page-message";
import type { Doctor } from "@/types/doctor";
import { DoctorRow } from "./doctor-row";

export function DoctorList({
  data,
  handleDeleteDoctor,
}: {
  data: Doctor[];
  handleDeleteDoctor: (id: string) => void;
}) {
  if (data.length == 0) {
    return <EmptyListMessage message="Chưa có bác sĩ" />;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Mã bác sĩ</TableHead>
          <TableHead>Tên bác sĩ</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Chuyên khoa</TableHead>
          <TableHead>Số giấy phép</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead>Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((doc) => (
          <DoctorRow
            key={doc.doctorId}
            doctor={doc}
            handleDeleteDoctor={handleDeleteDoctor}
          />
        ))}
      </TableBody>
    </Table>
  );
}
