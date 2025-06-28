import { Button } from "@/components/ui/button";

export const CurrentSchedule = () => {
  return (
    <div className="flex flex-col gap-3 items-end w-full h-full">
      <div className="flex w-full h-full border shadow border-gray-100 rounded">
        <div className="w-1/12 border border-gray-300 "></div>
        <div className="w-full grid grid-cols-7 gap-2 border border-gray-300"></div>
      </div>
      <div>
        <Button>Sửa</Button>
        <Button>Thêm lịch mới</Button>
      </div>
    </div>
  );
};
