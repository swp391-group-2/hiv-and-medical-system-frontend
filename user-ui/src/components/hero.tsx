import { Calendar, Clock, Gift, Search, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";
import heroImg from "/images/hero.jpg";
import { Link } from "react-router-dom";

function Hero({ scrollToHomeService }: { scrollToHomeService: () => void }) {
  return (
    <section className="bg-primary/25 py-15 ">
      <div className="container mx-auto">
        <div className="grid grid-cols-6 gap-5 items-center">
          <div className="col-span-3">
            <h1 className="font-bold text-5xl ">
              Hiểu Đúng -{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-600">
                Sống Khỏe
              </span>
            </h1>
            <h2 className="mt-2.5  font-bold text-2xl text-primary">
              Cùng nhau đẩy lùi HIV
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg mt-2.5">
              Trang thông tin và hỗ trợ xét nghiệm, khám và điều trị HIV – cung
              cấp kiến thức cần thiết, hướng dẫn đăng ký khám, tư vấn bảo mật và
              cập nhật các phương pháp điều trị hiệu quả hiện nay.
            </p>
            <div className="mt-5 flex gap-4">
              <Button
                onClick={scrollToHomeService}
                className="text-primary bg-white hover:bg-white  border-sky-400"
                size="xl"
              >
                <Calendar className="!w-[20px] !h-[20px]" /> Đăng Ký Xét Nghiệm
              </Button>
              <Link to={"/services/doctors"}>
                <Button className="text-white border-0 " size="xl">
                  <Search className="!w-[20px] !h-[20px]" /> Tìm Bác Sĩ
                </Button>
              </Link>
              <Button
                className="text-white border-0"
                variant="destructive"
                size="xl"
              >
                <Calendar className="!w-[20px] !h-[20px]" /> Đặt Lịch Khám
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-blue-100">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-4 shadow-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  24/7
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Hỗ trợ trực tuyến
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-cyan-100">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full mb-4 shadow-lg">
                  <ShieldCheck className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-cyan-600 mb-2">
                  100%
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Bảo mật thông tin
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-red-100">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full mb-4 shadow-lg">
                  <Gift className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-red-500 mb-2">Free</div>
                <div className="text-sm text-gray-600 font-medium">
                  Tư vấn miễn phí
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 relative">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 animate-pulse"></div>

              <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute -top-2 -right-6 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-40 animate-pulse"></div>
              <div className="absolute -bottom-3 -left-2 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-50 animate-bounce delay-300"></div>
              <div className="absolute -bottom-6 -right-4 w-10 h-10 bg-gradient-to-r from-cyan-300 to-blue-300 rounded-full opacity-30 animate-pulse delay-500"></div>

              <div className="relative bg-white rounded-2xl p-2 transform group-hover:scale-[1.02] transition-all duration-500">
                <img
                  src={heroImg}
                  alt="Img HIV"
                  className="w-full h-auto object-cover rounded-xl shadow-2xl group-hover:shadow-3xl transition-shadow duration-500"
                />

                <div className="absolute inset-2 rounded-xl bg-black/5"></div>

                <div className="absolute top-4 left-4 w-3 h-3 border-l-2 border-t-2 border-blue-400 opacity-60"></div>
                <div className="absolute top-4 right-4 w-3 h-3 border-r-2 border-t-2 border-cyan-400 opacity-60"></div>
                <div className="absolute bottom-4 left-4 w-3 h-3 border-l-2 border-b-2 border-blue-400 opacity-60"></div>
                <div className="absolute bottom-4 right-4 w-3 h-3 border-r-2 border-b-2 border-cyan-400 opacity-60"></div>
              </div>

              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-100/30 via-cyan-100/25 to-blue-100/30 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out pointer-events-none shadow-inner"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
