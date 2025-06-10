import { GenericList, type CD4RsProps, type ViralLoadRsProps } from "./common";
import { TestRsItem, type TestRsItemProps } from "./test-rs-item";

const TestRsLabels = () => {
  return (
    <div className="text-gray-500 text-center w-full grid grid-cols-5 mt-5 mb-5 p-4">
      <span>STT</span>
      <span>Loại xét nghiệm</span>
      <span>Kết quả</span>
      <span>Thời gian xét nghiệm</span>
      <span>Thao tác</span>
    </div>
  );
};

export type TestRsListProps = {
  list: TestRsItemProps[];
  viral: ViralLoadRsProps;
  cd4: CD4RsProps;
};

const TestRsList = ({ list, viral, cd4 }: TestRsListProps) => {
  return (
    <GenericList<TestRsItemProps>
      items={list}
      header={<TestRsLabels />}
      renderItem={(item) => (
        <TestRsItem key={item.id} item={item} viral={viral} cd4={cd4} />
      )}
    />
  );
};

export default TestRsList;
