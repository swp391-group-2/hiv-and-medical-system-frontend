import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShieldX, ShieldCheck } from "lucide-react";
import { type Staff } from "@/types/staff";
import { DisableStaffDialog } from "./DisableStaffDialog";
import { ActiveStaffDialog } from "./ActiveStaffDialog";

interface StaffTableProps {
  staffs: Staff[];
}

export const StaffTable = ({ staffs }: StaffTableProps) => {
  const [disableDialogOpen, setDisableDialogOpen] = useState(false);
  const [activeDialogOpen, setActiveDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  const handleDisableClick = (staff: Staff) => {
    setSelectedStaff(staff);
    setDisableDialogOpen(true);
  };

  const handleActiveClick = (staff: Staff) => {
    setSelectedStaff(staff);
    setActiveDialogOpen(true);
  };
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead>Mã nhân viên</TableHead> */}
            <TableHead>Họ và tên</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                Chưa có nhân viên nào trong hệ thống
              </TableCell>
            </TableRow>
          ) : (
            staffs.map((staff: Staff) => (
              <TableRow key={staff.staffId}>
                {/* <TableCell className="font-medium">{staff.staffCode}</TableCell> */}
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
                <TableCell>
                  <div className="flex gap-2">
                    {staff.status === "ACTIVE" ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDisableClick(staff)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <ShieldX className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleActiveClick(staff)}
                        className="text-green-600 hover:text-green-700"
                      >
                        <ShieldCheck className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Disable Staff Dialog */}
      {selectedStaff && (
        <DisableStaffDialog
          staff={selectedStaff}
          isOpen={disableDialogOpen}
          onOpenChange={setDisableDialogOpen}
        />
      )}

      {/* Active Staff Dialog */}
      {selectedStaff && (
        <ActiveStaffDialog
          staff={selectedStaff}
          isOpen={activeDialogOpen}
          onOpenChange={setActiveDialogOpen}
        />
      )}
    </div>
  );
};
