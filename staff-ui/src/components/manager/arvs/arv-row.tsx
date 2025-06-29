import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Prescription } from "@/types/types";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { UpdateArvForm } from "./update-form";

export function ArvRow({ arv }: { arv: Prescription }) {
  return (
    <TableRow>
      <TableCell>{arv.prescriptionId}</TableCell>
      <TableCell>{arv.name}</TableCell>

      <TableCell className="grid grid-cols-2 items-center gap-4">
        <Dialog>
          <Tooltip delayDuration={500}>
            <TooltipTrigger>
              <DialogTrigger asChild>
                <Button
                  className="cursor-pointer w-full"
                  variant="outline"
                  size="sm"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chỉnh sửa thông tin</p>
            </TooltipContent>
          </Tooltip>
          <DialogContent className="flex flex-col justify-between min-w-[1100px] min-h-[800px]">
            <DialogHeader>
              <DialogTitle>Cập nhật phác đồ</DialogTitle>
            </DialogHeader>
            <UpdateArvForm
              className="flex flex-col justify-between space-y-4 grow"
              arv={arv}
            />
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
