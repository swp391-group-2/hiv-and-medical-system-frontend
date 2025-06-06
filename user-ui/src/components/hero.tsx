import { Calendar, Search } from "lucide-react";
import { Button } from "./ui/button";
import heroImg from "/images/hero.jpg";

function Hero() {
  return (
    <section className="bg-primary/25 py-15 ">
      <div className="container mx-auto">
        <div className="grid grid-cols-6 gap-5 items-center">
          <div className="col-span-3">
            <h1 className="font-bold text-5xl ">Hiểu Đúng - Sống Khỏe</h1>
            <h2 className="mt-2.5  font-bold text-4xl text-primary">
              Cùng nhau đẩy lùi HIV
            </h2>
            <div className="mt-10 flex gap-1.5">
              <Button
                className="text-primary border-sky-400"
                variant="outline"
                size="xl"
              >
                <Calendar className="!w-[30px] !h-[30px]" /> Đăng Ký Xét Nghiệm
              </Button>
              <Button className="text-white border-0 " size="xl">
                <Search className="!w-[30px] !h-[30px]" /> Tìm Bác Sĩ
              </Button>
              <Button
                className="text-white border-0"
                variant="destructive"
                size="xl"
              >
                <Calendar className="!w-[30px] !h-[30px]" /> Đặt Lịch Khám
              </Button>
            </div>
          </div>
          <div className="col-span-3">
            <img
              src={heroImg}
              alt="Img HIV"
              className="rounded-4xl drop-shadow-2xl drop-shadow-amber-200"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
