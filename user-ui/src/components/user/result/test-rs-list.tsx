import type { LabResult } from "@/types/LabResult.type";
import { GenericList } from "./common";
import { TestRsItem } from "./test-rs-item";

const TestRsLabels = () => {
  return (
    <div className="w-full grid grid-cols-7 text-center gap-4 mb-6 px-6 py-4 rounded-2xl  shadow-lg border">
      <span className="font-bold col-span-1  text-gray-800 text-sm uppercase tracking-wider">
        Mã Số
      </span>
      <span className="font-bold col-span-2  text-gray-800 text-sm uppercase tracking-wider">
        Loại xét nghiệm
      </span>
      <span className="font-bold col-span-1  text-gray-800 text-sm uppercase tracking-wider">
        Kết quả
      </span>
      <span className="font-bold col-span-2  text-gray-800 text-sm uppercase tracking-wider">
        Thời gian xét nghiệm
      </span>
      <span className="font-bold col-span-1  text-gray-800 text-sm uppercase tracking-wider">
        Thao tác
      </span>
    </div>
  );
};

export type TestRsListProps = {
  list: LabResult[];
};

const TestRsList = ({ list }: TestRsListProps) => {
  if (list.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full py-12 px-4">
        <div className="text-gray-400 mb-2">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p className="text-gray-500 text-lg font-medium">
          Không có kết quả xét nghiệm
        </p>
        <p className="text-gray-400 text-sm mt-1">
          Các kết quả xét nghiệm sẽ hiển thị tại đây
        </p>
      </div>
    );
  }

  return (
    <GenericList<LabResult>
      items={list}
      header={<TestRsLabels />}
      renderItem={(item) => <TestRsItem key={item.labResultId} item={item} />}
    />
  );
};

export default TestRsList;
