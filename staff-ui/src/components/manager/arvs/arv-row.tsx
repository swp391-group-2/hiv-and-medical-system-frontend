import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Prescription } from "@/types/types";

export function ArvRow({ arv }: { arv: Prescription }) {
  return (
    <TableRow>
      <TableCell>{arv.prescriptionId}</TableCell>
      <TableCell>{arv.name}</TableCell>

      <TableCell className="grid grid-cols-2 items-center gap-4">
        <Tooltip delayDuration={500}>
          <TooltipTrigger>
            <Button
              className="cursor-pointer w-full"
              variant="outline"
              size="sm"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Chỉnh sửa thông tin</p>
          </TooltipContent>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
