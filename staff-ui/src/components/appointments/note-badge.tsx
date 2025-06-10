import { Badge } from "@/components/ui/badge";

export function NoteBadge({ hasNote }: { hasNote: boolean }) {
  return hasNote ? (
    <Badge variant="outline">Có ghi chú</Badge>
  ) : (
    <span className="text-sm text-gray-400">Không có</span>
  );
}
