import { Ellipsis } from "lucide-react";

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

import { InfoGroup, InfoTextRow, RsNote } from "./common";
import type { AppointmentCompletedEntry } from "@/types/appointment.type";

const CheckUpRsItem = ({ item }: { item: AppointmentCompletedEntry }) => {
  const [open, setOpen] = useState(false);

  return (
    <li className="w-full grid grid-cols-9  items-center border-b last:border-b-0 pt-4 pb-4 first:pt-0 last:pb-0">
      <span>{item.appointmentCode}</span>
      <span className="col-span-2">Bs. {item.doctor.fullName}</span>
      <span className="col-span-3">
        {item.patientPrescription.prescriptionDefaultName}
      </span>
      <span className="col-span-2">
        {item.startTime + "-" + new Date(item.date).toLocaleDateString("vi")}
      </span>
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
                <TabsTrigger value="virus-load">
                  Tải lượng virus và CD4
                </TabsTrigger>
              </TabsList>
              <TabsContent value="detail" className="p-3">
                <InfoGroup>
                  <InfoTextRow label="Mã số khám" data={item.appointmentCode} />
                  <InfoTextRow label="Bác sĩ" data={item.doctor.fullName} />
                  <InfoTextRow label="Email Bác sĩ" data={item.doctor.email} />
                  <InfoTextRow
                    label="Ngày Khám"
                    data={new Date(
                      item.labResult.resultDate
                    ).toLocaleDateString("vi")}
                  />
                  <InfoTextRow
                    label="Thời gian"
                    data={item.startTime + " - " + item.endTime}
                  />
                  <InfoTextRow
                    label="Phác đồ được chọn"
                    data={item.patientPrescription.prescriptionDefaultName}
                  />
                  <RsNote note={item.patientPrescription.note} />
                </InfoGroup>
              </TabsContent>
              <TabsContent value="virus-load" className="p-3">
                <InfoGroup>
                  <InfoTextRow
                    label="Tải lượng virus"
                    data={
                      item.labResult.resultNumericViralLoad +
                      " " +
                      item.labResult.labTestParameter.unitViralLoad
                    }
                  />
                  <InfoTextRow
                    label="Số lượng CD4 (cells/mm³)"
                    data={
                      item.labResult.resultNumericCD4 +
                      " " +
                      item.labResult.labTestParameter.unitCD4
                    }
                  />
                  <InfoTextRow
                    label="Ngày xét nghiệm"
                    data={new Date(
                      item.labResult.resultDate
                    ).toLocaleDateString("vi")}
                  />
                  <InfoTextRow
                    label="Thời gian trả kết quả"
                    data={item.startTime + " - " + item.endTime}
                  />
                  <InfoTextRow
                    label="Kết Luận"
                    data={item.labResult.conclusion || "Chưa có kết luận"}
                  />

                  <RsNote note={item.labResult.note} />
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

export { CheckUpRsItem };
