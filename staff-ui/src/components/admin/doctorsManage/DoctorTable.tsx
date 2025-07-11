import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogPortal,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, ShieldX, ShieldCheck, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { type Doctor } from "@/types/doctor";
import { DeleteDoctorDialog } from "./DisableDoctorDialog";
import { ActiveDoctorDialog } from "./ActiveDoctorDialog";
import { SelectedSchedule } from "../../manager/doctors/selected-schedule";

interface DoctorTableProps {
  doctors: Doctor[];
  onEditClick: (doctor: Doctor) => void;
}

export const DoctorTable = ({ doctors, onEditClick }: DoctorTableProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [activeDialogOpen, setActiveDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  // State cho work schedule dialog
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [scheduleSelectedDoctor, setScheduleSelectedDoctor] =
    useState<Doctor | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDeleteClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setDeleteDialogOpen(true);
  };

  const handleActiveClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setActiveDialogOpen(true);
  };

  const handleScheduleClick = (doctor: Doctor) => {
    setScheduleSelectedDoctor(doctor);
    setScheduleDialogOpen(true);
    setDate(new Date()); // Reset date when opening
    setShowCalendar(false);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setShowCalendar(false);
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead>Mã bác sĩ</TableHead> */}
            <TableHead>Họ và tên</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Chuyên khoa</TableHead>
            <TableHead>Số giấy phép</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {doctors.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                Chưa có bác sĩ nào trong hệ thống
              </TableCell>
            </TableRow>
          ) : (
            doctors.map((doctor: Doctor) => (
              <TableRow key={doctor.doctorId}>
                {/* <TableCell className="font-medium">
                  {doctor.doctorCode}
                </TableCell> */}
                <TableCell>{doctor.fullName}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
                <TableCell>{doctor.licenseNumber}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      doctor.userStatus === "ACTIVE" ? "default" : "secondary"
                    }
                  >
                    {doctor.userStatus === "ACTIVE"
                      ? "Hoạt động"
                      : "Không hoạt động"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditClick(doctor)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>

                    {/* Work Schedule Button */}
                    <Tooltip delayDuration={500}>
                      <TooltipTrigger asChild>
                        <Button
                          className="cursor-pointer"
                          variant="outline"
                          size="sm"
                          onClick={() => handleScheduleClick(doctor)}
                        >
                          <CalendarIcon className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Lịch làm việc</p>
                      </TooltipContent>
                    </Tooltip>

                    {doctor.userStatus === "ACTIVE" ? (
                      <Button
                        className="text-red-600 hover:text-red-700"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(doctor)}
                      >
                        <ShieldX className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleActiveClick(doctor)}
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

      {/* Delete Doctor Dialog */}
      {selectedDoctor && (
        <DeleteDoctorDialog
          doctor={selectedDoctor}
          isOpen={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        />
      )}

      {/* Active Doctor Dialog */}
      {selectedDoctor && (
        <ActiveDoctorDialog
          doctor={selectedDoctor}
          isOpen={activeDialogOpen}
          onOpenChange={setActiveDialogOpen}
        />
      )}

      {/* Work Schedule Dialog */}
      {scheduleSelectedDoctor && (
        <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
          <DialogPortal>
            <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !w-[80vw] !h-[90vh] !max-w-none !max-h-none flex flex-col justify-between">
              <DialogHeader className="flex justify-between">
                <DialogTitle>
                  Cập nhật lịch làm việc:{" "}
                  <span className="text-blue-800 pl-4 text-xl">
                    {scheduleSelectedDoctor.fullName}
                  </span>
                </DialogTitle>
                {/* date picker */}
                <div className="relative mt-4 self-end">
                  <div className="flex items-center space-x-2">
                    <Input
                      value={date ? format(date, "dd/MM/yyyy") : ""}
                      readOnly
                      placeholder="Chọn ngày"
                      className="w-[180px]"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setShowCalendar(!showCalendar)}
                      aria-label="Toggle calendar"
                    >
                      <CalendarIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  {showCalendar && (
                    <div className="absolute z-10 mt-2">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        className="rounded-md border shadow-md bg-white"
                      />
                    </div>
                  )}
                </div>
              </DialogHeader>
              <SelectedSchedule
                dateInWeek={date ?? new Date()}
                doctor={scheduleSelectedDoctor}
              />
            </DialogContent>
          </DialogPortal>
        </Dialog>
      )}
    </div>
  );
};
