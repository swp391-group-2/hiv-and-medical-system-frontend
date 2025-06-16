import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Stethoscope, Calendar, Users } from "lucide-react";

const DoctorHero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-cyan-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-6">
                ĐẶT KHÁM THEO BÁC SĨ
              </h1>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">
                    Chủ động chọn bác sĩ tin tưởng, đặt càng sớm, càng có cơ hội
                    có số thứ tự thấp nhất, tránh hết số
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">
                    Đặt khám theo giờ, không cần chờ lấy số thứ tự
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">
                    Thanh toán nhanh chóng, tiện lợi qua ví điện tử hoặc chuyển
                    khoản ngân hàng
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">
                    Được hướng chỉnh sách hoàn tiền khi đặt lịch trên medpro
                    (đối với các csyt tự có áp dụng)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex justify-center space-x-6 mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
                    <Stethoscope className="w-12 h-12 text-blue-600" />
                  </div>
                  <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
                    <Users className="w-12 h-12 text-green-600" />
                  </div>
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
                    <Calendar className="w-12 h-12 text-purple-600" />
                  </div>
                </div>

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-primary to-sky-800 bg-clip-text text-transparent">
                    Đội ngũ bác sĩ chuyên nghiệp
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Hơn 1000+ bác sĩ giàu kinh nghiệm, chuyên môn cao đang phục
                    vụ bệnh nhân với chất lượng dịch vụ tốt nhất
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorHero;
