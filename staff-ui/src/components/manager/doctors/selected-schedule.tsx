import { useCurrentWeekSchedule, useSlots } from "@/api/schedule";
import { Button } from "@/components/ui/button";
import { cn, formatDMY, formatYMD } from "@/lib/utils";
import type { Doctor, ScheduleSlot, Schedule } from "@/types/doctor";
import {
  CalendarCheck,
  Plus,
  Save,
  Loader2,
  Undo2,
  Pencil,
  Ban,
  Hourglass,
  UserRoundCheck,
  UserRoundX,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, useEffect, useMemo, useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import http from "@/api/http";
import type { AxiosError } from "axios";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// types >>>>>>>>>>>>>>>
interface BackendSchedulePayload {
  workDate: string;
  slotId: number[];
}

type ScheduleAction = {
  type: "ADD" | "REMOVE";
  workDate: string;
  sSlot: ScheduleSlot;
};

interface DisableBookedSlotPayload {
  id: number;
  continuity: boolean;
}
// the main component >>>>>>>>>>>>>>>

export const SelectedSchedule = ({
  dateInWeek,
  doctor,
}: {
  dateInWeek: Date;
  doctor: Doctor;
}) => {
  // define hooks >>>>>>>>>>>>>>>

  const queryClient = useQueryClient();
  const { data: initialWeekSchedule = [], isLoading } = useCurrentWeekSchedule(
    doctor.doctorId,
    dateInWeek
  );
  const { data: slotsData = [] } = useSlots();
  const slotsInHour = useMemo(
    () => slotsData.map((slot) => `${slot.startTime}-${slot.endTime}`),
    [slotsData]
  );

  const [editableWeekSchedule, setEditableWeekSchedule] = useState<Schedule[]>(
    []
  );
  const [scheduleHistory, setScheduleHistory] = useState<ScheduleAction[]>([]);
  const [updateIds, setUpdateIds] = useState<number[]>([]);
  const [onCreate, setOnCreate] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [disablingSlot, setDisablingSlot] = useState<{
    workDate: string;
    slotNumber: number;
  } | null>(null);

  // keeps editable schedule and initial schedule (from backend) synced
  useEffect(() => {
    if (initialWeekSchedule.length > 0) {
      setEditableWeekSchedule(initialWeekSchedule);
    }
  }, [initialWeekSchedule]);

  // create new schedules handler >>>>>>>>>>>>>>>

  const { mutate: createDoctorSchedule, isPending: isCreating } = useMutation<
    void,
    Error,
    BackendSchedulePayload[]
  >({
    mutationFn: async (payload) =>
      http.post(`/doctors/${doctor.doctorId}/schedules/generate`, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["weekSchedule", doctor.doctorId],
      });
      toast.success("Cập nhật lịch làm việc thành công!");
      if (onCreate) {
        setOnCreate(false);
      } else {
        setOnEdit(false);
      }
      setScheduleHistory([]);
    },
    onError: (error) => {
      toast.error(`Lỗi cập nhật lịch: ${error.message}`);
    },
  });

  // update existing schedules handler >>>>>>>>>>>>>>>

  const { mutate: updateDoctorSchedule, isPending: isUpdating } = useMutation<
    void,
    AxiosError,
    number[]
  >({
    mutationFn: async (payload) =>
      http.post(`/doctors/schedules/available/block`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["weekSchedule", doctor.doctorId],
      });
      toast.success("Cập nhật lịch làm việc thành công!");
      setOnEdit(false);
      setScheduleHistory([]);
    },
    onError: (error) => {
      toast.error(`Lỗi cập nhật lịch: ${error.message}`);
    },
  });

  // disable booked slots

  const { mutate: disableBookedSlot, isPending: isDisabling } = useMutation<
    void,
    AxiosError,
    DisableBookedSlotPayload
  >({
    mutationFn: async (payload) =>
      http.post(`/doctors/schedules/unavailable/block`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["weekSchedule", doctor.doctorId],
      });
      toast.success("Huỷ lịch thành công!");
      if (onCreate) {
        setOnCreate(false);
      } else {
        setOnEdit(false);
      }
    },
    onError: (error) => {
      toast.error(`Lỗi cập nhật lịch: ${error.message}`);
    },
  });

  // handle slot toggle both when onCreate and onEdit >>>>>>>>>>>>>>>

  const handleSlotToggle = useCallback(
    (workDate: string, slotNumber: number) => {
      if (!onCreate && !onEdit) return;

      setEditableWeekSchedule((prevSchedule) => {
        let actionToRecord: ScheduleAction;
        return prevSchedule.map((day) => {
          if (day.workDate === workDate) {
            const currentSlots = day.scheduleSlots;
            const foundScheduleSlot = currentSlots.find(
              (sSlot) => sSlot.slot.slotNumber === slotNumber
            );
            const isOccupied = !!foundScheduleSlot;
            if (!isOccupied) {
              const newSlotDetail = slotsData.find(
                (s) => s.slotNumber === slotNumber
              );

              if (!newSlotDetail) {
                console.error(
                  `SlotDetail for slotNumber ${slotNumber} not found!`
                );
                return day;
              }

              const newScheduleSlot: ScheduleSlot = {
                id: 0,
                scheduleId: 0,
                slot: newSlotDetail,
                status: "AVAILABLE",
              };
              actionToRecord = {
                type: "ADD",
                workDate: workDate,
                sSlot: newScheduleSlot,
              };

              const lastHistoryEntry = scheduleHistory.at(
                scheduleHistory.length - 1
              );
              if (
                actionToRecord.workDate !== lastHistoryEntry?.workDate ||
                actionToRecord.sSlot.id !== lastHistoryEntry?.sSlot.id
              ) {
                setScheduleHistory([...scheduleHistory, actionToRecord]);
              }

              return {
                ...day,
                scheduleSlots: [...currentSlots, newScheduleSlot],
              };
            } else {
              actionToRecord = {
                type: "REMOVE",
                workDate: workDate,
                sSlot: foundScheduleSlot,
              };

              const lastHistoryEntry = scheduleHistory.at(
                scheduleHistory.length - 1
              );
              if (
                actionToRecord.workDate !== lastHistoryEntry?.workDate ||
                actionToRecord.sSlot.id !== lastHistoryEntry?.sSlot.id
              ) {
                setScheduleHistory([...scheduleHistory, actionToRecord]);
                setUpdateIds([...updateIds, actionToRecord.sSlot.id]);
              }

              return {
                ...day,
                scheduleSlots: currentSlots.filter(
                  (sSlot) => sSlot.slot.slotNumber !== slotNumber
                ),
              };
            }
          }
          return day;
        });
      });
    },
    [
      setEditableWeekSchedule,
      setScheduleHistory,
      setUpdateIds,
      onCreate,
      onEdit,
      slotsData,
      updateIds,
    ]
  );

  // create function >>>>>>>>>>>>>>>

  const handleCreateSchedule = useCallback(() => {
    // Transform the editableWeekSchedule into the backend's expected format
    const payload: BackendSchedulePayload[] = editableWeekSchedule.map(
      (day) => ({
        workDate: day.workDate,
        slotId: day.scheduleSlots.map((sSlot) => sSlot.slot.id), // Extract slot.id from each ScheduleSlot
      })
    );

    console.log("Transformed payload for backend:", payload);
    createDoctorSchedule(payload);
  }, [editableWeekSchedule, createDoctorSchedule]);

  // update function >>>>>>>>>>>>>>>

  const handleUpdateSchedule = useCallback(
    (payload: number[]) => {
      updateDoctorSchedule(payload);
    },
    [updateDoctorSchedule]
  );

  // cancel operation function >>>>>>>>>>>>>>>

  const handleCancelEdit = useCallback(() => {
    if (initialWeekSchedule.length > 0) {
      setEditableWeekSchedule(JSON.parse(JSON.stringify(initialWeekSchedule)));
      setScheduleHistory([]);
    } else {
      setEditableWeekSchedule([]);
    }
    setOnCreate(false);
    setOnEdit(false);
    setUpdateIds([]);
  }, [
    initialWeekSchedule,
    setEditableWeekSchedule,
    setScheduleHistory,
    setOnCreate,
    setOnEdit,
    setUpdateIds,
  ]);

  // handle disable booked slots

  const handleDisableBookedSlot = useCallback(
    (payload: DisableBookedSlotPayload) => {
      disableBookedSlot(payload);
    },
    [disableBookedSlot]
  );
  // undo toggle function >>>>>>>>>>>>>>>

  const handleUndoToggle = useCallback(() => {
    const lastAction = scheduleHistory.at(scheduleHistory.length - 1);
    setScheduleHistory(scheduleHistory.slice(0, -1));
    setEditableWeekSchedule((prevSchedule) =>
      prevSchedule.map((day) => {
        if (day.workDate === lastAction?.workDate) {
          if (lastAction.type === "ADD") {
            return {
              ...day,
              scheduleSlots: day.scheduleSlots.filter(
                (sSlot) =>
                  sSlot.slot.slotNumber !== lastAction.sSlot.slot.slotNumber
              ),
            };
          } else {
            const originalSlot: ScheduleSlot = {
              id: lastAction.sSlot.id,
              scheduleId: lastAction.sSlot.scheduleId,
              slot: lastAction.sSlot.slot,
              status: lastAction.sSlot.status,
            };
            setUpdateIds(updateIds.filter((id) => id !== originalSlot.id));
            return {
              ...day,
              scheduleSlots: [...day.scheduleSlots, originalSlot],
            };
          }
        }
        return day;
      })
    );
  }, [
    scheduleHistory,
    setScheduleHistory,
    setEditableWeekSchedule,
    setUpdateIds,
    updateIds,
  ]);

  if (isLoading) {
    return <div className="text-center py-8">Đang tải lịch làm việc...</div>;
  }

  // return statement >>>>>>>>>>>>>>>

  return (
    <div className="flex flex-col gap-3 items-end w-full h-full overflow-scroll">
      {onCreate && (
        <div className="w-full bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2">
          <p className="text-blue-700 text-sm font-medium">
            💡 Chế độ thêm lịch mới: Click vào các ô trống (có dấu +) để thêm
            slot làm việc, sau đó click "Lưu" để hoàn tất.
          </p>
        </div>
      )}
      <div className="w-11/12 grid grid-cols-7 gap-2">
        {initialWeekSchedule.map((day, idx) => (
          <div key={day.workDate} className="text-center flex flex-col">
            <span className=" text-sm font-semibold">
              {idx === 6 ? "Chủ nhật" : `Thứ ${idx + 2}`}
            </span>
            <span className=" text-sm text-gray-500 font-semibold">{`(${formatDMY(
              day.workDate
            )})`}</span>
          </div>
        ))}
      </div>
      <div className="flex w-full h-full border shadow border-gray-100 rounded">
        <div className="w-1/12 flex flex-col justify-evenly border border-gray-300 ">
          {slotsInHour.map((slotTime) => (
            <div key={slotTime} className="text-center">
              <span className="text-sm text-gray-500 font-semibold">
                {slotTime}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full grid grid-cols-7 gap-2 border pl-2 pr-2 border-gray-300">
          {editableWeekSchedule.map((day) => (
            <div
              key={day.workDate}
              className="h-full flex flex-col gap-2 pt-4 pb-4 justify-evenly items-center rounded"
            >
              {slotsData.map((slotDetail) => {
                const slotNumber = slotDetail.slotNumber;
                const foundScheduleSlot = day.scheduleSlots.find(
                  (sSlot: ScheduleSlot) => sSlot.slot.slotNumber === slotNumber
                );
                const isOccupied = !!foundScheduleSlot;
                const isAvailable = !!(
                  foundScheduleSlot?.status === "AVAILABLE"
                );
                const isBlocked = !!(foundScheduleSlot?.status === "BLOCKED");
                const isExpired = !!(foundScheduleSlot?.status === "EXPIRED");
                const checkedIn = !!(
                  foundScheduleSlot?.status === "CHECKED_IN"
                );
                const expiredNoCheckedIn = !!(
                  foundScheduleSlot?.status === "EXPIRED_NO_CHECKED_IN"
                );
                const today = new Date();

                return (
                  <Dialog
                    open={
                      disablingSlot?.workDate === day.workDate &&
                      disablingSlot?.slotNumber === slotNumber
                    }
                    onOpenChange={(open) => {
                      if (!open) setDisablingSlot(null);
                    }}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                          <div
                            key={`${day.workDate}-${slotNumber}`}
                            className={cn(
                              "w-full h-full flex items-center justify-center border border-gray-300 rounded",
                              isOccupied && isAvailable ? "bg-green-400" : "",
                              isOccupied && !isAvailable ? "bg-orange-300" : "",
                              isOccupied && isBlocked ? "bg-red-100" : "",
                              onCreate &&
                                !isOccupied &&
                                "cursor-pointer bg-white hover:bg-gray-100",
                              onEdit && isOccupied && isAvailable
                                ? "hover:bg-green-500 cursor-pointer"
                                : "",
                              onEdit &&
                                !isExpired &&
                                !expiredNoCheckedIn &&
                                !isBlocked &&
                                isOccupied &&
                                !isAvailable &&
                                updateIds.length === 0
                                ? "hover:bg-orange-200 cursor-pointer"
                                : "",
                              onEdit &&
                                !isExpired &&
                                !expiredNoCheckedIn &&
                                !isBlocked &&
                                isOccupied &&
                                !isAvailable &&
                                updateIds.length > 0
                                ? "bg-orange-100"
                                : "",
                              isExpired ? "bg-green-200" : "",
                              checkedIn || expiredNoCheckedIn
                                ? "bg-orange-100"
                                : ""
                            )}
                            onClick={() => {
                              if (
                                !isOccupied &&
                                onCreate &&
                                day.workDate >= formatYMD(today.toISOString())
                              ) {
                                handleSlotToggle(day.workDate, slotNumber);
                              } else if (
                                onEdit &&
                                isOccupied &&
                                isAvailable &&
                                !isBlocked
                              ) {
                                handleSlotToggle(day.workDate, slotNumber);
                              } else if (
                                onEdit &&
                                isOccupied &&
                                !isBlocked &&
                                !expiredNoCheckedIn &&
                                !isExpired &&
                                !isAvailable &&
                                updateIds.length === 0
                              ) {
                                setDisablingSlot({
                                  workDate: day.workDate,
                                  slotNumber,
                                });
                              } else if (
                                !isOccupied &&
                                !onCreate &&
                                day.workDate >= formatYMD(today.toISOString())
                              ) {
                                toast.info(
                                  "Vui lòng click 'Thêm lịch mới' trước để thêm slot!"
                                );
                              }
                            }}
                          >
                            {expiredNoCheckedIn ? (
                              <UserRoundX className="text-red-500" />
                            ) : checkedIn ? (
                              <UserRoundCheck className="text-green-500" />
                            ) : isExpired ? (
                              <Hourglass className="text-gray-400" />
                            ) : !isExpired &&
                              !isBlocked &&
                              isOccupied &&
                              !checkedIn ? (
                              <CalendarCheck className="text-white" />
                            ) : isBlocked ? (
                              <Ban className="text-red-500" />
                            ) : (
                              <Plus
                                className={cn(
                                  "text-gray-300",
                                  onCreate && "text-blue-400"
                                )}
                              />
                            )}
                          </div>
                        </DialogTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        {expiredNoCheckedIn
                          ? "Slot đã hết hạn - không có check-in"
                          : checkedIn
                          ? "Đã check-in"
                          : isExpired
                          ? "Slot đã hết hạn"
                          : !isExpired && !isBlocked && isOccupied && !checkedIn
                          ? "Slot đã được đặt"
                          : isBlocked
                          ? "Slot bị chặn"
                          : onCreate
                          ? "Click để thêm slot làm việc"
                          : "Click 'Thêm lịch mới' để thêm slot"}
                      </TooltipContent>
                    </Tooltip>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Huỷ lịch có người đặt</DialogTitle>
                        <DialogDescription>
                          Chọn một lựa chọn bên dưới để xác nhận! Hành động này
                          không thể hoàn tác.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          className="cursor-pointer bg-red-500 hover:bg-red-400 text-white hover:text-white"
                          disabled={isDisabling}
                          onClick={() => {
                            if (foundScheduleSlot?.id !== undefined) {
                              handleDisableBookedSlot({
                                id: foundScheduleSlot.id,
                                continuity: false,
                              });
                            }
                          }}
                        >
                          {isDisabling ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                              Đang xử lí...
                            </>
                          ) : (
                            "Huỷ lịch hoàn tiền"
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          className="cursor-pointer bg-white hover:bg-gray-100"
                          onClick={() => setDisablingSlot(null)}
                        >
                          Thoát
                        </Button>
                        <Button
                          variant="outline"
                          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white hover:text-white"
                          disabled={isDisabling}
                          onClick={() => {
                            if (foundScheduleSlot?.id !== undefined) {
                              handleDisableBookedSlot({
                                id: foundScheduleSlot.id,
                                continuity: true,
                              });
                            }
                          }}
                        >
                          {isDisabling ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                              Đang xử lí...
                            </>
                          ) : (
                            "Hỗ trợ đổi lịch"
                          )}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full flex items-center justify-between gap-2">
        <div className="flex gap-2 items-center">
          <p>Chú thích: </p>
          <Tooltip>
            <TooltipTrigger>
              <div className="rounded w-[20px] h-[20px] bg-green-400"></div>
            </TooltipTrigger>
            <TooltipContent>
              <span>Lịch khả dụng</span>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <div className="rounded w-[20px] h-[20px] bg-orange-300"></div>
            </TooltipTrigger>
            <TooltipContent>
              <span>Lịch đã được đặt</span>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <div className="rounded w-[20px] h-[20px] bg-white border border-gray-300"></div>
            </TooltipTrigger>
            <TooltipContent>
              <span>Lịch trống</span>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Ban className="text-red-500" />
            </TooltipTrigger>
            <TooltipContent>
              <span>Lịch huỷ do bác sĩ bận</span>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <Hourglass className="text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <span>Lịch quá hạn</span>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <UserRoundCheck className="text-green-500" />
            </TooltipTrigger>
            <TooltipContent>
              <span>Đã check in</span>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <UserRoundX className="text-red-500" />
            </TooltipTrigger>
            <TooltipContent>
              <span>Không tới khám</span>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex gap-3">
          {onCreate || onEdit ? (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                disabled={scheduleHistory.length === 0}
                className={cn(
                  scheduleHistory.length === 0
                    ? "bg-gray-300 hover:bg-gray-300"
                    : "cursor-pointer bg-white hover:bg-gray-100"
                )}
                onClick={handleUndoToggle}
              >
                <Undo2 />
                Hoàn tác
              </Button>
              <Button
                variant="destructive"
                className="cursor-pointer"
                onClick={handleCancelEdit}
              >
                Huỷ
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white hover:text-white mr-2"
              onClick={() => setOnEdit(true)}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Sửa
            </Button>
          )}

          {onCreate || onEdit ? (
            <Button
              variant="outline"
              className="cursor-pointer bg-green-500 hover:bg-green-600 text-white hover:text-white"
              onClick={() => {
                if (onCreate) {
                  handleCreateSchedule();
                } else {
                  handleUpdateSchedule(updateIds);
                }
              }}
              disabled={isUpdating || scheduleHistory.length === 0}
            >
              {isUpdating || isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang lưu...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" /> Lưu
                </>
              )}
            </Button>
          ) : (
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => setOnCreate(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Thêm lịch mới
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
