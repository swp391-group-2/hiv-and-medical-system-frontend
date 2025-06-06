import { Hospital } from "lucide-react";

import homeInfoImg from "/images/home-info.jpg";

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
        <div className="grid grid-cols-12 items-center">
          <div className="col-span-8 space-y-6">
            <div className="space-y-4">
              <h2 className="text-4xl text-primary font-bold flex items-center gap-3">
                Giới thiệu cơ sở y tế
                <Hospital className="w-8 h-8 text-primary" />
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground max-w-[80%]">
                Chúng tôi tiên phong trong chăm sóc, điều trị HIV với sự nhiệt
                tình, hành động, cam kết bảo mật tuyệt đối và hỗ trợ bạn sống
                khỏe mạnh, hạnh phúc.
              </p>
            </div>

            <div className="space-y-4">
              {commitments.map((commitment, index) => (
                <div
                  key={index}
                  className="border-l-4 border-primary pl-4 py-2"
                >
                  <h3 className="text-xl font-semibold text-foreground">
                    {commitment.title}
                  </h3>
                  <p className="text-base text-muted-foreground mt-1">
                    {commitment.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-4 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/40 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <img
                src={homeInfoImg}
                alt="Home info Img"
                className="relative rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-300 ease-out"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeInfo;
