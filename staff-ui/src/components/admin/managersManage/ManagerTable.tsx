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

import type { Manager } from "@/types/manager";
import { ActiveManagerDialog } from "./ActiveManagerDialog";
import { DisableManagerDialog } from "./DisableManagerDialog";

interface ManagerTableProps {
  managers: Manager[];
}

export const ManagerTable = ({ managers }: ManagerTableProps) => {
  const [disableDialogOpen, setDisableDialogOpen] = useState(false);
  const [activeDialogOpen, setActiveDialogOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState<Manager | null>(null);

  const handleDisableClick = (manager: Manager) => {
    setSelectedManager(manager);
    setDisableDialogOpen(true);
  };

  const handleActiveClick = (manager: Manager) => {
    setSelectedManager(manager);
    setActiveDialogOpen(true);
  };
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
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {managers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                Chưa có nhân viên nào trong hệ thống
              </TableCell>
            </TableRow>
          ) : (
            managers.map((manager: Manager) => (
              <TableRow key={manager.managerId}>
                <TableCell className="font-medium">
                  {manager.managerCode}
                </TableCell>
                <TableCell>{manager.fullName}</TableCell>
                <TableCell>{manager.email}</TableCell>
                <TableCell>{manager.role}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      manager.status === "ACTIVE" ? "default" : "secondary"
                    }
                  >
                    {manager.status === "ACTIVE"
                      ? "Hoạt động"
                      : "Không hoạt động"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {manager.status === "ACTIVE" ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDisableClick(manager)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <ShieldX className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleActiveClick(manager)}
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
      {selectedManager && (
        <DisableManagerDialog
          manager={selectedManager}
          isOpen={disableDialogOpen}
          onOpenChange={setDisableDialogOpen}
        />
      )}

      {/* Active Staff Dialog */}
      {selectedManager && (
        <ActiveManagerDialog
          manager={selectedManager}
          isOpen={activeDialogOpen}
          onOpenChange={setActiveDialogOpen}
        />
      )}
    </div>
  );
};
