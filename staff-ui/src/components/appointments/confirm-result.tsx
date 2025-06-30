import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import type { Appointment } from "@/types/types";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const ConfirmResult = ({ appt }: { appt: Appointment }) => {
  const queryClient = useQueryClient();
  const isResultOk =
    appt.status === "LAB_COMPLETED" || appt.status === "COMPLETED";

  const { mutate: confirmReturn, isPending } = useMutation<
    void,
    AxiosError<{ message?: string }>,
    boolean
  >({
    mutationFn: async (payload: boolean) =>
      await axios.post(
        `/api/appointments/${appt.appointmentId}/can-return`,
        JSON.stringify(payload),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      ),
    onSuccess: (_data, wasOk) => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      if (wasOk) {
        toast.success("Xác nhận thành công!");
      } else {
        toast.success("Đã từ chối kết quả");
      }
    },
    onError: (err) => {
      const msg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : err.message;
      console.log(msg);
      toast.error("Đã có lỗi xảy ra !");
    },
  });

  function handleReject() {
    confirmReturn(false);
  }
  function handleAccept() {
    confirmReturn(true);
  }
  return (
    <div>
      {!isResultOk ? (
        appt.labResult.resultStatus === "REJECTED" ? (
          <Button variant="outline" disabled className="bg-red-500 text-white">
            Đã từ chối kết quả
          </Button>
        ) : (
          <div className="flex gap-4">
            <Button
              variant="outline"
              disabled={isPending}
              className="bg-red-500 hover:bg-red-600 text-white cursor-pointer"
              onClick={handleReject}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang xử
                  lý...
                </>
              ) : (
                "Từ chối kết quả"
              )}
            </Button>
            <Button
              variant="outline"
              disabled={isPending}
              className="bg-green-500 hover:bg-green-600 text-white cursor-pointer"
              onClick={handleAccept}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Đang xử
                  lý...
                </>
              ) : (
                "Xác nhận kết quả"
              )}
            </Button>
          </div>
        )
      ) : (
        <Button
          variant="outline"
          disabled
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Đã nhận kết quả
        </Button>
      )}
    </div>
  );
};

export default ConfirmResult;
