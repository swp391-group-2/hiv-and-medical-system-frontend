import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Staff } from "@/types/staff";

interface StaffTableProps {
  staffs: Staff[];
}

export const StaffTable = ({ staffs }: StaffTableProps) => {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Mã nhân viên</TableHead>
            <TableHead>Họ và tên</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead>Trạng thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                Chưa có nhân viên nào trong hệ thống
              </TableCell>
            </TableRow>
          ) : (
            staffs.map((staff: Staff) => (
              <TableRow key={staff.staffId}>
                <TableCell className="font-medium">
                  {staff.staffCode}
                </TableCell>
                <TableCell>{staff.fullName}</TableCell>
                <TableCell>{staff.email}</TableCell>
                <TableCell>{staff.role}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      staff.status === "ACTIVE" ? "default" : "secondary"
                    }
                  >
                    {staff.status === "ACTIVE"
                      ? "Hoạt động"
                      : "Không hoạt động"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
