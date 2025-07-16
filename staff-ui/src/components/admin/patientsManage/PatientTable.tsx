import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { type Patient } from "@/types/types";
import { PatientDetailsDialog } from "./PatientDetailsDialog";

interface PatientTableProps {
  patients: Patient[];
}

export const PatientTable = ({ patients }: PatientTableProps) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleViewDetails = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsDialogOpen(true);
  };

  return (
    <>
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
              <TableHead>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
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
                        patient.userStatus === "ACTIVE"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {patient.userStatus === "ACTIVE"
                        ? "Hoạt động"
                        : "Không hoạt động"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(patient)}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <PatientDetailsDialog
        patient={selectedPatient}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
};
