import { Ellipsis } from "lucide-react";
import { formatDMY, formatISO } from "@/lib/utils";
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
import { Button } from "../../ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { ViralLoadRsProps, CD4RsProps } from "./common";
import { InfoGroup, InfoTextRow, RsNote } from "./common";

export type TestRsItemProps = {
  id: number;
  type: string;
  result: string;
  time: string;
  note: string;
};

const TestRsItem = ({
  item,
  viral,
  cd4,
}: {
  item: TestRsItemProps;
  viral: ViralLoadRsProps;
  cd4: CD4RsProps;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="w-full grid grid-cols-5 text-center items-center border-b last:border-b-0 pt-4 pb-4 first:pt-0 last:pb-0">
      <span>{item.id}</span>
      <span>{item.type}</span>
      <span>{item.result}</span>
      <span>{formatISO(item.time)}</span>
      <span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="cursor-pointer">
              <Ellipsis />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="center">
            <DropdownMenuItem>
              <Link to="/arv">Xem phác đồ</Link>
            </DropdownMenuItem>
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
                <TabsTrigger value="virus-load">Tải lượng virus</TabsTrigger>
                <TabsTrigger value="cd4">CD4</TabsTrigger>
              </TabsList>
              <TabsContent value="detail" className="p-3">
                <InfoGroup>
                  <InfoTextRow label="Nơi khám" data="Cơ sở HIV" />
                  <InfoTextRow label="Loại xét nghiệm" data={item.type} />
                  <InfoTextRow label="Kết quả" data={item.result} />
                  <InfoTextRow
                    label="Thời gian xét nghiệm"
                    data={formatISO(item.time)}
                  />
                  <RsNote note={item.note} />
                </InfoGroup>
              </TabsContent>
              <TabsContent value="virus-load" className="p-3">
                <InfoGroup>
                  <InfoTextRow
                    label="Ngày xét nghiệm"
                    data={formatDMY(viral.date)}
                  />
                  <InfoTextRow label="Tải lượng virus" data={viral.load} />
                  <InfoTextRow label="Kết quả định tính" data={viral.result} />
                  <RsNote note={viral.note} />
                </InfoGroup>
              </TabsContent>
              <TabsContent value="cd4" className="p-3">
                <InfoGroup>
                  <InfoTextRow
                    label="Ngày xét nghiệm"
                    data={formatDMY(cd4.date)}
                  />
                  <InfoTextRow
                    label="Số lượng CD4 (cells/mm³)"
                    data={cd4.quantity.toString()}
                  />
                  <InfoTextRow
                    label="Phần trăm CD4 (%)"
                    data={cd4.percentage.toString()}
                  />
                  <InfoTextRow
                    label="Ngưỡng bình thường"
                    data={cd4.normal_threshold}
                  />
                  <RsNote note={cd4.note} />
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
