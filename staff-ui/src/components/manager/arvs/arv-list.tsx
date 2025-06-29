import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
} from "@/components/ui/table";
import { EmptyListMessage } from "@/components/page-message";
import type { Prescription } from "@/types/types";
import { ArvRow } from "./arv-row";

export function ArvList({
  data,
  isError,
}: {
  data: Prescription[];
  isError: boolean;
}) {
  if (isError) {
    return (
      <EmptyListMessage message="Đã xảy ra lỗi, không thể tải danh sách" />
    );
  }
  if (data.length == 0) {
    return <EmptyListMessage message="Chưa có phác đồ" />;
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Mã phác đồ</TableHead>
          <TableHead>Tên phác đồ</TableHead>
          <TableHead>Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <ArvRow arv={item} />
        ))}
      </TableBody>
    </Table>
  );
}
