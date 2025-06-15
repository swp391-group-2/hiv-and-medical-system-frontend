import {
  User,
  Calendar,
  Mail,
  CreditCard,
  MapPin,
  Building,
  AlertCircleIcon,
  Undo2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";

const BookingConfirm = () => {
  return (
    <div className="min-h-screen  p-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="py-0 pb-5">
              <CardHeader className="bg-primary p-2 px-5 text-white rounded-t-lg">
                <CardTitle className="text-xl ">Thông tin cơ sở y tế</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-3">
                  <Building className="w-6 h-6 text-gray-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Trung tâm điều trị Aura HIV
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">
                      Dịch vụ xét nghiệm và điều trị HIV tại Trung tâm
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="mb-6 py-0 pb-5">
              <CardHeader className="bg-primary p-2 px-5 text-white rounded-t-lg">
                <CardTitle className="text-xl">
                  Xác nhận thông tin khám
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="">
                        <TableHead className="text-gray-700">#</TableHead>
                        <TableHead className="text-gray-700">Dịch Vụ</TableHead>
                        <TableHead className="text-gray-700">Bác Sĩ</TableHead>
                        <TableHead className="text-gray-700">
                          Thời gian khám
                        </TableHead>
                        <TableHead className="text-gray-700">
                          Tiền khám
                        </TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Khám điều trị HIV</TableCell>
                        <TableCell>Uông Thanh Tú</TableCell>
                        <TableCell>
                          <div>09:00 - 10:00</div>
                          <div className="text-gray-500">26/06/2025</div>
                        </TableCell>
                        <TableCell>160.000 đ</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <Card className="py-0 pb-5">
              <CardHeader className="bg-primary p-2 px-5  text-white rounded-t-lg">
                <CardTitle className="text-xl">Thông tin bệnh nhân</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="text-gray-600">Họ và tên:</span>
                        <span className="ml-2 font-medium">
                          NGUYỄN HOÀI PHƯƠNG
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="text-gray-600">Ngày sinh:</span>
                        <span className="ml-2 font-medium">20/03/2004</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="text-gray-600">Email:</span>
                        <span className="ml-2 font-medium">
                          nhphuong203204@gmail.com
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="text-gray-600">Mã số BHYT:</span>
                        <span className="ml-2 font-medium">Chưa cập nhật</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="text-gray-600">Giới tính:</span>
                        <span className="ml-2 font-medium">Nam</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="text-gray-600">CMND:</span>
                        <span className="ml-2 font-medium">0742042223251</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <User className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="text-gray-600">Dân tộc:</span>
                        <span className="ml-2 font-medium">Kinh</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-500" />
                      <div>
                        <span className="text-gray-600">Địa chỉ:</span>
                        <span className="ml-2 font-medium">
                          ấp 1 Thị trấn Cù Chi Huyện Cù Chi Thành phố Hồ Chí
                          Minh
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Warning Notice */}
                <Alert
                  variant="destructive"
                  className="mt-6 border-red-200 bg-red-50"
                >
                  <AlertCircleIcon />
                  <AlertDescription>
                    Trong thời gian quy định, nếu quý khách hủy phiếu khám sẽ
                    được hoàn lại tiền khám và các dịch vụ đặt thêm (không bao
                    gồm phí tiện ích).
                  </AlertDescription>
                </Alert>

                {/* Confirm Button */}
                <div className="mt-6 flex justify-end">
                  <Button className="  px-8 py-3">Xác nhận</Button>
                </div>
              </CardContent>
            </Card>
            <Button
              variant="ghost"
              className="mt-2.5 flex items-center text-lg"
            >
              <Undo2 className="mr-2" />
              Quay Lại
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirm;
