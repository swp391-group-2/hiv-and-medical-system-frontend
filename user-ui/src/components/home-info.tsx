import { Hospital } from "lucide-react";

import homeInfoImg from "../assets/images/home-info.jpg";

const commitments: { title: string; desc: string }[] = [
  {
    title: "Sứ mệnh:",
    desc: "Đẩy lùi kì thị, mang lại cuộc sống tích cực",
  },
  {
    title: "Cam kết:",
    desc: "Bảo mật - An tâm - Tận tâm",
  },
];

function HomeInfo() {
  return (
    <section>
      <div className="container py-8 mx-auto">
        <div className="grid grid-cols-12">
          <div className="col-span-8">
            <h2 className="text-4xl text-primary font-bold flex items-center gap-2.5">
              Giới thiệu cơ sở y tế
              <Hospital className="w-[30px] h-[30px]" />
            </h2>
            <p className="text-xl mt-2.5 w-[70%] text-gray-500">
              Chúng tôi tiên phong trong chăm sóc, điều trị HIV với sự nhiệt
              tình, hành động, cam kết bảo mật tuyệt đối và hỗ trợ bạn sống khỏe
              mạnh, hạnh phúc.
            </p>
            {commitments.map((commitment) => (
              <div className="mt-2.5">
                <p className="text-2xl font-bold">{commitment.title}</p>
                <p className="text-xl text-gray-500">{commitment.desc}</p>
              </div>
            ))}
          </div>
          <div className="col-span-4">
            <img
              src={homeInfoImg}
              alt="Home info Img"
              className="rounded-2xl shadow-2xl shadow-primary"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeInfo;
