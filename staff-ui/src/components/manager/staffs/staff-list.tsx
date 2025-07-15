import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
} from "@/components/ui/table";
import { EmptyListMessage } from "@/components/page-message";
import type { Staff } from "@/types/staff";
import { StaffRow } from "./staff-row";

export function StaffList({
  data,
  handleDeleteStaff,
  handleEditStaff,
  isError,
}: {
  data: Staff[];
  handleDeleteStaff: (id: string) => void;
  handleEditStaff: (staff: Staff) => void;
  isError: boolean;
}) {
  if (isError) {
    return (
      <EmptyListMessage message="Đã xảy ra lỗi, không thể tải danh sách" />
    );
  }
  if (data.length == 0) {
    return <EmptyListMessage message="Chưa có nhân viên" />;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Tên nhân viên</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Chức vụ</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead>Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((staff) => (
          <StaffRow
            key={staff.staffId}
            staff={staff}
            handleDeleteStaff={handleDeleteStaff}
            handleEditStaff={handleEditStaff}
          />
        ))}
      </TableBody>
    </Table>
  );
}
