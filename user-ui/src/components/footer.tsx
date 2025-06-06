import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./logo";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Logo />
            </div>
            <p className="text-muted-foreground mb-4">
              Cung cấp các giải pháp quản lý chăm sóc sức khỏe toàn diện để có
              sự chăm sóc bệnh nhân tốt hơn và hiệu quả y tế cao hơn.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/prescription"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Giáo dục HIV
                </Link>
              </li>
              <li>
                <Link
                  to="/appointment"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Đặt lịch hẹn
                </Link>
              </li>
              <li>
                <Link
                  to="/health-record"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Hồ sơ sức khỏe
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Dịch vụ</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/service/screeningtest"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Xét nghiệm sàng lọc
                </Link>
              </li>
              <li>
                <Link
                  to="/service/confirmatorytest"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Xét nghiệm khẳng định
                </Link>
              </li>
              <li>
                <Link
                  to="/doctors"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Đội ngũ bác sĩ
                </Link>
              </li>

              <li>
                <Link
                  to="/help"
                  className="text-muted-foreground hover:text-white transition-colors"
                >
                  Trợ giúp
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Thông tin liên hệ</h4>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <p>(84) 123-456-789</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <p>info@medicalsystem.com</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <p>Thành phố Hồ Chí Minh, Việt Nam</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-4 text-center text-muted-foreground">
          <p>&copy; 2025 Hệ thống Y tế. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
