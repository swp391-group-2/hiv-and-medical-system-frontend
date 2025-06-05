import React from "react";
interface MainContentRightProps {
  price: string;
  image: string;
}
const MainContentRight: React.FC<MainContentRightProps> = ({
  price,
  image
}) => {
  return (
    <div className="lg:w-1/3 flex flex-col items-center">
      <div className="bg-blue-100 rounded-xl w-full flex flex-col items-center py-6">
        <img
          src={image}
          alt="Phòng xét nghiệm"
          className="w-full max-w-xs rounded-xl mb-6 object-cover"
        />
        <div className="text-lg font-bold text-blue-700 mb-3">
          Giá Chỉ {price}
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg px-8 py-3 text-base">
          Đặt Lịch Xét Nghiệm Ngay
        </button>
      </div>
    </div>
  );
};

export default MainContentRight;
