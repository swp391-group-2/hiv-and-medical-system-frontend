import { Button } from "@/components/ui/button";

export const CurrentSchedule = () => {
  return (
    <div className="flex flex-col gap-3 items-end w-full h-full">
      <div className="w-full h-full border border-gray-100 rounded">
        <div></div>
        <div></div>
      </div>
      <div>
        <Button>Sửa</Button>
        <Button>Thêm lịch mới</Button>
      </div>
    </div>
  );
};
