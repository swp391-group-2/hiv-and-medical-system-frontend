import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, Trash2 } from "lucide-react";
import { disableUserAccount } from "@/api/admin";
import { type Doctor } from "@/types/doctor";
import { toast } from "sonner";

interface DeleteDoctorDialogProps {
  doctor: Doctor;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteDoctorDialog = ({
  doctor,
  isOpen,
  onOpenChange,
}: DeleteDoctorDialogProps) => {
  const queryClient = useQueryClient();

  const disableDoctorMutation = useMutation({
    mutationFn: () => disableUserAccount(doctor.userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      onOpenChange(false);
      toast.success("Bác sĩ đã được vô hiệu hóa thành công!");
    },
    onError: (error: Error) => {
      toast.error(`Lỗi khi vô hiệu hóa bác sĩ: ${error.message || "Có lỗi xảy ra"}`);
    },
  });

  const handleDelete = () => {
    disableDoctorMutation.mutate();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Vô hiệu hóa tài khoản bác sĩ</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn vô hiệu hóa tài khoản của bác sĩ{" "}
            <strong>{doctor.fullName}</strong> ({doctor.email})?
            <br />
            <br />
            Tài khoản này sẽ được đặt thành trạng thái không hoạt động và bác sĩ 
            sẽ không thể đăng nhập vào hệ thống.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={disableDoctorMutation.isPending}>
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={disableDoctorMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {disableDoctorMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              "Vô hiệu hóa"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
