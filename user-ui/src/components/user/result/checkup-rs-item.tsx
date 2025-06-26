import {
  Ellipsis,
  Calendar,
  Clock,
  User,
  FileText,
  Activity,
} from "lucide-react";

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
  DialogHeader,
  DialogTitle,
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
    <li className="group w-full grid grid-cols-9 items-center border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 py-4 px-2 rounded-lg">
      {/* Appointment Code */}
      <div className="font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded text-sm">
        {item.appointmentCode}
      </div>

      {/* Doctor Info */}
      <div className="col-span-2 flex items-center gap-2">
        <User className="w-4 h-4 text-gray-400" />
        <div>
          <div className="font-medium text-gray-900 text-sm">
            Bs. {item.doctor.fullName}
          </div>
          <div className="text-xs text-gray-500">{item.doctor.email}</div>
        </div>
      </div>

      {/* Prescription */}
      <div className="col-span-3 flex items-center gap-2">
        <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <span className="text-gray-800 text-sm leading-relaxed line-clamp-2">
          {item.patientPrescription.prescriptionDefaultName}
        </span>
      </div>

      {/* Date & Time */}
      <div className="col-span-2 flex items-center gap-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-sm">
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="font-medium text-gray-700">{item.startTime}</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Calendar className="w-3 h-3 text-gray-400" />
            <span className="text-gray-500">
              {new Date(item.date).toLocaleDateString("vi")}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Ellipsis className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align="end">
            <DropdownMenuItem asChild>
              <Link to="/arv" className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Xem phác đồ
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setOpen(true);
              }}
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Xem chi tiết
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Chi tiết buổi khám - {item.appointmentCode}
              </DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="detail" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="detail" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Thông tin khám
                </TabsTrigger>
                <TabsTrigger
                  value="virus-load"
                  className="flex items-center gap-2"
                >
                  <Activity className="w-4 h-4" />
                  Kết quả xét nghiệm
                </TabsTrigger>
              </TabsList>

              <TabsContent value="detail" className="mt-6 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <InfoGroup>
                    <InfoTextRow
                      label="Mã số khám"
                      data={item.appointmentCode}
                    />
                    <InfoTextRow label="Bác sĩ" data={item.doctor.fullName} />
                    <InfoTextRow
                      label="Email Bác sĩ"
                      data={item.doctor.email}
                    />
                    <InfoTextRow
                      label="Ngày Khám"
                      data={new Date(
                        item.labResult.resultDate
                      ).toLocaleDateString("vi")}
                    />
                    <InfoTextRow
                      label="Thời gian"
                      data={`${item.startTime} - ${item.endTime}`}
                    />
                    <InfoTextRow
                      label="Phác đồ được chọn"
                      data={item.patientPrescription.prescriptionDefaultName}
                    />
                  </InfoGroup>
                </div>
                <RsNote note={item.patientPrescription.note} />
              </TabsContent>

              <TabsContent value="virus-load" className="mt-6 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <InfoGroup>
                    <InfoTextRow
                      label="Tải lượng virus"
                      data={`${item.labResult.resultNumericViralLoad} ${item.labResult.labTestParameter.unitViralLoad}`}
                    />
                    <InfoTextRow
                      label="Số lượng CD4 (cells/mm³)"
                      data={`${item.labResult.resultNumericCD4} ${item.labResult.labTestParameter.unitCD4}`}
                    />
                    <InfoTextRow
                      label="Ngày xét nghiệm"
                      data={new Date(
                        item.labResult.resultDate
                      ).toLocaleDateString("vi")}
                    />
                    <InfoTextRow
                      label="Thời gian trả kết quả"
                      data={`${item.startTime} - ${item.endTime}`}
                    />
                    <InfoTextRow
                      label="Kết Luận"
                      data={item.labResult.conclusion || "Chưa có kết luận"}
                    />
                  </InfoGroup>
                </div>
                <RsNote note={item.labResult.note} />
              </TabsContent>
            </Tabs>

            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">Đóng</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </li>
  );
};

export { CheckUpRsItem };
