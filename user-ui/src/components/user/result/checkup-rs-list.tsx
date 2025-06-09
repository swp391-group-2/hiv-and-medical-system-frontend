import { CheckUpRsItem, type CheckUpRsItemProps } from "./checkup-rs-item";
import { GenericList, type CD4RsProps, type ViralLoadRsProps } from "./common";
const CheckUpRsLabels = () => {
  return (
    <div className="text-gray-500 text-center w-full grid grid-cols-5 mt-5 mb-5 p-4">
      <span>STT</span>
      <span>Bác sĩ phụ trách</span>
      <span>Phác đồ đã chọn</span>
      <span>Thời gian khám</span>
      <span>Thao tác</span>
    </div>
  );
};

const CheckUpResultList = ({
  list,
  viral,
  cd4,
}: {
  list: CheckUpRsItemProps[];
  viral: ViralLoadRsProps;
  cd4: CD4RsProps;
}) => {
  return (
    <GenericList<CheckUpRsItemProps>
      items={list}
      header={<CheckUpRsLabels />}
      renderItem={(item) => (
        <CheckUpRsItem key={item.id} item={item} viral={viral} cd4={cd4} />
      )}
    />
  );
};

export default CheckUpResultList;
