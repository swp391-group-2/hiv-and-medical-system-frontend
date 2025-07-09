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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import type { Appointment } from "@/types/types";
import PatientProfileInfo from "@/components/appointments/patient-profile";
import { ConfirmCheckinDialog } from "@/components/appointments/confirm-checkin";
import type { AxiosError } from "axios";
import http from "@/api/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function CheckinEllipsis({ appt }: { appt: Appointment }) {
  type DisableAppointmentPayload = {
    id: number;
    continuity: boolean;
  };
  const queryClient = useQueryClient();
  const { mutate: disableAppointment, isPending: isDisabling } = useMutation<
    void,
    AxiosError,
    DisableAppointmentPayload
  >({
    mutationFn: async (payload) =>
      http.put(
        `/appointments/${appt.appointmentId}/cancel-by-manager`,
        payload
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
      toast.success("Huỷ lịch thành công!");
    },
    onError: (error) => {
      toast.error(`Lỗi huỷ lịch: ${error.message}`);
    },
  });

  const disableAppointmentFn = (payload: DisableAppointmentPayload) => {
    disableAppointment(payload);
  };
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="center">
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            setConfirm(true);
          }}
        >
          Check-In
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          Xem hồ sơ bệnh nhân
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            setOpenCancel(true);
          }}
        >
          Huỷ lịch hẹn này
        </DropdownMenuItem>
      </DropdownMenuContent>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[500px] min-h-[550px] flex flex-col justify-between">
          <DialogHeader>
            <DialogTitle>Xem hồ sơ bệnh nhân</DialogTitle>
          </DialogHeader>
          <PatientProfileInfo appt={appt} />
          <DialogFooter>
            <DialogClose asChild>
              <Button className="bg-blue-500 hover:bg-blue-600 cursor-pointer">
                Đóng
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ConfirmCheckinDialog
        open={confirm}
        setOpen={setConfirm}
        patientName={appt.patient.fullName}
        appt={appt}
      />
      <Dialog open={openCancel} onOpenChange={setOpenCancel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Huỷ lịch có người đặt</DialogTitle>
            <DialogDescription>
              Chọn một lựa chọn bên dưới để xác nhận! Hành động này không thể
              hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              className="cursor-pointer bg-red-500 hover:bg-red-400 text-white hover:text-white"
              disabled={isDisabling}
              onClick={() =>
                disableAppointmentFn({
                  id: appt.appointmentId,
                  continuity: false,
                })
              }
            >
              {isDisabling ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang xử
                  lí...
                </>
              ) : (
                "Huỷ lịch hoàn tiền"
              )}
            </Button>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="cursor-pointer bg-white hover:bg-gray-100"
              >
                Thoát
              </Button>
            </DialogClose>
            <Button
              variant="outline"
              className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white hover:text-white"
              disabled={isDisabling}
              onClick={() =>
                disableAppointmentFn({
                  id: appt.appointmentId,
                  continuity: true,
                })
              }
            >
              {isDisabling ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang xử
                  lí...
                </>
              ) : (
                "Hỗ trợ đổi lịch"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  );
}
