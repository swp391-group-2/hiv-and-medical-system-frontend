import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type Patient } from "@/types/types";

interface PatientTableProps {
  patients: Patient[];
}

export const PatientTable = ({ patients }: PatientTableProps) => {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead>Mã bệnh nhân</TableHead> */}
            <TableHead>Họ và tên</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Ngày sinh</TableHead>
            <TableHead>Giới tính</TableHead>
            <TableHead>SĐT</TableHead>
            <TableHead>Trạng thái</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                Chưa có bệnh nhân nào trong hệ thống
              </TableCell>
            </TableRow>
          ) : (
            patients.map((patient: Patient) => (
              <TableRow key={patient.patientId}>
                {/* <TableCell className="font-medium">
                  {patient.patientCode}
                </TableCell> */}
                <TableCell>{patient.fullName}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.dob}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.phoneNumber}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      patient.userStatus === "ACTIVE" ? "default" : "secondary"
                    }
                  >
                    {patient.userStatus === "ACTIVE"
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
