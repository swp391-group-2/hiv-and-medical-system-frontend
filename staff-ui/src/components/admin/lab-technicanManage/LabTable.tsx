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
import { ShieldX, ShieldCheck, Edit } from "lucide-react";
import type { LabTechnician } from "@/types/lab-technicians";
import { DisableLabDialog } from "./DisableLabDialog";
import { ActiveLabDialog } from "./ActiveLabDialog";
import { UpdateLabDialog } from "./UpdateLabDialog";

interface LabTableProps {
  labs: LabTechnician[];
}

const LabTable = ({ labs }: LabTableProps) => {
  const [disableDialogOpen, setDisableDialogOpen] = useState(false);
  const [activeDialogOpen, setActiveDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedLab, setSelectedLab] = useState<LabTechnician | null>(null);

  const handleDisableClick = (lab: LabTechnician) => {
    setSelectedLab(lab);
    setDisableDialogOpen(true);
  };

  const handleActiveClick = (lab: LabTechnician) => {
    setSelectedLab(lab);
    setActiveDialogOpen(true);
  };

  const handleUpdateClick = (lab: LabTechnician) => {
    setSelectedLab(lab);
    setUpdateDialogOpen(true);
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateClick(lab)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
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

      {/* Update Lab Dialog */}
      {selectedLab && (
        <UpdateLabDialog
          lab={selectedLab}
          isOpen={updateDialogOpen}
          onOpenChange={setUpdateDialogOpen}
        />
      )}
    </div>
  );
};

export default LabTable;
