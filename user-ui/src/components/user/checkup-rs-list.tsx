import {
  CheckUpRsItem,
  type CD4RsProps,
  type CheckUpRsItemProps,
  type ViralLoadRsProps,
} from "./checkup-rs-item";

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
  return list.length ? (
    <>
      <CheckUpRsLabels />
      <ul className="w-full border border-gray-300 p-4 rounded">
        {list.map((item) => (
          <CheckUpRsItem item={item} viral={viral} cd4={cd4} />
        ))}
      </ul>
    </>
  ) : (
    <span className="block w-full text-center text-4xl text-zinc-500 py-8 italic">
      Chưa có kết quả
    </span>
  );
};

export default CheckUpResultList;
