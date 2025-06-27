import { Ellipsis } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { InfoGroup, InfoTextRow, RsNote } from "./common";
import type { LabResult } from "@/types/LabResult.type";

const TestRsItem = ({ item }: { item: LabResult }) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="group w-full grid grid-cols-7 text-center items-center border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 py-4 px-2 rounded-lg">
      <span>
        <span className="text-blue-500 rounded-full  bg-blue-50  px-2 mr-6 py-1">
          {item.labResultId}
        </span>
      </span>
      <span className="col-span-2">{item.serviceName}</span>
      <span
        className={cn(
          "px-3 py-1 rounded-full text-sm font-medium",
          item.resultText === "Dương tính"
            ? "bg-red-100 text-red-700"
            : "bg-green-100 text-green-700"
        )}
      >
        {item.resultText}
      </span>
      <span className="col-span-2">
        {new Date(item.resultDate).toLocaleString("vi")}
      </span>
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
              Xem
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="w-[500px] min-h-[550px] flex flex-col justify-between">
            <Tabs defaultValue="detail">
              <h3 className="text-center text-2xl font-bold mb-5">
                Thông Tin Xét Nghiệm
              </h3>
              <TabsContent value="detail" className="p-3 rounded-2xl ">
                <InfoGroup>
                  <InfoTextRow label="Cơ sở Y Tế" data="Medcare HIV" />
                  <InfoTextRow
                    label="Loại xét nghiệm"
                    data={item.serviceName}
                  />
                  <InfoTextRow label="Kết quả" data={item.resultText} />
                  <InfoTextRow
                    label="Thời gian xét nghiệm"
                    data={new Date(item.resultDate).toLocaleString("vi")}
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
