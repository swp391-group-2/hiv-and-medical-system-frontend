import { Badge } from "@/components/ui/badge";
import type { AppointmentStatus } from "@/types/types";

const statusMap: Record<
  AppointmentStatus,
  { label: string; className: string }
> = {
  SCHEDULED: { label: "Đã đặt lịch", className: "bg-gray-200 text-gray-800" },
  CHECKED_IN: { label: "Đã check-in", className: "bg-sky-500  text-white" },
  LAB_COMPLETED: {
    label: "Xét nghiệm xong",
    className: "bg-yellow-500 text-white",
  },
  COMPLETED: { label: "Hoàn tất", className: "bg-emerald-500 text-white" },
};

export function StatusBadge({ status }: { status: AppointmentStatus }) {
  const cfg = statusMap[status] ?? {
    label: status,
    className: "bg-muted text-muted-foreground",
  };

  return <Badge className={cfg.className}>{cfg.label}</Badge>;
}
