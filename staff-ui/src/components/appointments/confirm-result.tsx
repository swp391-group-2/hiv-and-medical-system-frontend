import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import type { Appointment } from "@/types/types";
import { toast } from "sonner";

const ConfirmResult = ({ appt }: { appt: Appointment }) => {
  const queryClient = useQueryClient();
  const isResultOk = appt.status === "LAB_COMPLETED";

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
        <div className="flex gap-4">
          <Button
            variant="outline"
            disabled={isPending}
            className="bg-red-500 hover:bg-red-600 text-white cursor-pointer"
            onClick={handleReject}
          >
            Từ chối kết quả
          </Button>
          <Button
            variant="outline"
            disabled={isPending}
            className="bg-green-500 hover:bg-green-600 text-white cursor-pointer"
            onClick={handleAccept}
          >
            Xác nhận kết quả
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          disabled
          className="bg-green-500 hover:bg-green-600 text-white cursor-pointer"
        >
          Đã nhận kết quả
        </Button>
      )}
    </div>
  );
};

export default ConfirmResult;
