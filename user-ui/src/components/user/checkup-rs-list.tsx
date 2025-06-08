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
import { Button } from "../ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

export type CheckUpRsItemProps = {
  id: number;
  doctor: string;
  arv: string;
  time: string;
  note: string;
};

type ViralLoadRsProps = {
  date: string;
  load: string;
  result: string;
  note: string;
};

type CD4RsProps = {
  date: string;
  quantity: number;
  percentage: number;
  normal_threshold: string;
  note: string;
};

const CheckUpRsLabels = () => {
  return (
    <div className="text-gray-500 text-center w-full grid grid-cols-5 mt-5 mb-5 p-4">
      <span>STT</span>
      <span>Bác sĩ phụ trách</span>
      <span>Phác đồ đã chọn</span>
      <span>Thời gian khám</span>
      <span>Thao tác</span>
    </div>
  );
};
const CheckUpRsNote = ({ note }: { note: string }) => {
  return (
    <div>
      <div className="mb-2 flex">
        <span className="w-32 text-zinc-700 font-medium">Ghi chú:</span>
      </div>
      <input
        type="text"
        value={note}
        disabled
        className="w-full bg-zinc-100 rounded px-4 py-3 text-zinc-600 border-none cursor-not-allowed outline-none"
      />
    </div>
  );
};

const InfoGroup = ({ children }: { children: React.ReactNode }) => {
  return <div className="space-y-4">{children}</div>;
};

const InfoTextRow = ({ label, data }: { label: string; data: string }) => {
  return (
    <div className="flex">
      <span className="w-32 text-zinc-700 font-medium">{label}:</span>
      <span className="text-zinc-900">{data}</span>
    </div>
  );
};

const CheckUpRsItem = ({
  item,
  viral,
  cd4,
}: {
  item: CheckUpRsItemProps;
  viral: ViralLoadRsProps;
  cd4: CD4RsProps;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="w-full grid grid-cols-5 text-center items-center border-b last:border-b-0 pt-4 pb-4 first:pt-0 last:pb-0">
      <span>{item.id}</span>
      <span>Bs. {item.doctor}</span>
      <span>{item.arv}</span>
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
                  <InfoTextRow label="Bác sĩ" data={item.doctor} />
                  <InfoTextRow label="Nơi khám" data="Bệnh viện HIV" />
                  <InfoTextRow label="Thời gian" data={formatISO(item.time)} />
                  <InfoTextRow label="Phác đồ được chọn" data={item.arv} />
                  <CheckUpRsNote note={item.note} />
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
                  <CheckUpRsNote note={viral.note} />
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
                  <CheckUpRsNote note={cd4.note} />
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

const CheckUpResultList = ({
  list,
  viral,
  cd4,
}: {
  list: CheckUpRsItemProps[];
  viral: ViralLoadRsProps;
  cd4: CD4RsProps;
}) => {
  return list.length ? (
    <>
      <CheckUpRsLabels />
      <ul className="w-full border border-gray-300 p-4 rounded">
        {list.map((item) => (
          <CheckUpRsItem item={item} viral={viral} cd4={cd4} />
        ))}
      </ul>
    </>
  ) : (
    <span className="block w-full text-center text-4xl text-zinc-500 py-8 italic">
      Chưa có kết quả
    </span>
  );
};

export default CheckUpResultList;
