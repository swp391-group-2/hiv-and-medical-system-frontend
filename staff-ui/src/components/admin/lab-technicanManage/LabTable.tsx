import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldX, ShieldCheck } from "lucide-react";
import type { LabTechnician } from "@/types/lab-technicians";
import { DisableLabDialog } from "./DisableLabDialog";
import { ActiveLabDialog } from "./ActiveLabDialog";
interface LabTableProps {
  labs: LabTechnician[];
}

const LabTable = ({ labs }: LabTableProps) => {
  const [disableDialogOpen, setDisableDialogOpen] = useState(false);
  const [activeDialogOpen, setActiveDialogOpen] = useState(false);
  const [selectedLab, setSelectedLab] = useState<LabTechnician | null>(null);
  const handleDisableClick = (lab: LabTechnician) => {
    setSelectedLab(lab);
    setDisableDialogOpen(true);
  };
  const handleActiveClick = (lab: LabTechnician) => {
    setSelectedLab(lab);
    setActiveDialogOpen(true);
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Họ và tên</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Vai trò</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {labs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                Chưa có nhân viên nào trong hệ thống
              </TableCell>
            </TableRow>
          ) : (
            labs.map((lab: LabTechnician) => (
              <TableRow key={lab.labTechnicianId}>
                {/* <TableCell className="font-medium">{lab.labCode}</TableCell> */}
                <TableCell>{lab.fullName}</TableCell>
                <TableCell>{lab.email}</TableCell>
                <TableCell>{lab.role}</TableCell>
                <TableCell>
                  <Badge
                    variant={lab.status === "ACTIVE" ? "default" : "secondary"}
                  >
                    {lab.status === "ACTIVE" ? "Hoạt động" : "Không hoạt động"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {lab.status === "ACTIVE" ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDisableClick(lab)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <ShieldX className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleActiveClick(lab)}
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
      {selectedLab && (
        <DisableLabDialog
          lab={selectedLab}
          isOpen={disableDialogOpen}
          onOpenChange={setDisableDialogOpen}
        />
      )}

      {/* Active Staff Dialog */}
      {selectedLab && (
        <ActiveLabDialog
          lab={selectedLab}
          isOpen={activeDialogOpen}
          onOpenChange={setActiveDialogOpen}
        />
      )}
    </div>
  );
};

export default LabTable;
