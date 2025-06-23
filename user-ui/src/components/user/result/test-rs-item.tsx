import { Ellipsis } from "lucide-react";
import { formatISO } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { InfoGroup, InfoTextRow, RsNote } from "./common";
import type { LabResult } from "@/types/LabResult.type";

const TestRsItem = ({ item }: { item: LabResult }) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="w-full grid grid-cols-5 text-center items-center border-b last:border-b-0 pt-4 pb-4 first:pt-0 last:pb-0">
      <span>{item.labResultId}</span>
      <span>{item.serviceName}</span>
      <span>{item.resultText}</span>
      <span>{formatISO(item.resultDate)}</span>
      <span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="cursor-pointer">
              <Ellipsis />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="center">
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setOpen(true);
              }}
            >
              Xem chi tiết
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="w-[500px] min-h-[550px] flex flex-col justify-between">
            <Tabs defaultValue="detail">
              <TabsList>
                <TabsTrigger value="detail">Thông tin buổi khám</TabsTrigger>
              </TabsList>
              <TabsContent value="detail" className="p-3">
                <InfoGroup>
                  <InfoTextRow label="Cơ sở Y Tế" data="Medcare HIV" />
                  <InfoTextRow
                    label="Loại xét nghiệm"
                    data={item.serviceName}
                  />
                  <InfoTextRow label="Kết quả" data={item.resultText} />
                  <InfoTextRow
                    label="Thời gian xét nghiệm"
                    data={formatISO(item.resultDate)}
                  />
                  <InfoTextRow
                    label="Kết luận"
                    data={item.conclusion || "Chưa có kết luận"}
                  />
                  <RsNote note={item.note} />
                </InfoGroup>
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="primary"
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  Đóng
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </span>
    </li>
  );
};

export { TestRsItem };
