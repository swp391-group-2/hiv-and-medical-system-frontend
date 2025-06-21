import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StatusBadge } from "./status-badge";
import type { Appointment } from "@/types/types";
import { Badge } from "../ui/badge";
import { formatStd } from "@/lib/utils";
import ConfirmResult from "./confirm-result";
import Prescription from "./prescription";

const LabTestRs = ({ appt }: { appt: Appointment }) => {
  const hasResult =
    (appt.labResult.resultNumericCD4 !== null &&
      appt.labResult.resultNumericViralLoad !== null) ||
    appt.labResult.resultText !== null;
  return (
    <Card className="h-full shadow-md">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-lg">Kết quả xét nghiệm</CardTitle>
        {hasResult ? (
          <Badge variant="default" className="uppercase bg-blue-500">
            Đã có kết quả
          </Badge>
        ) : (
          <Badge variant="outline" className="uppercase">
            Chưa trả kết quả
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Sample Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Mẫu xét nghiệm</span>
            {appt.serviceType === "CONSULTATION" ? (
              <span className="font-medium">
                {appt.labSample.sampleCodeCD4 +
                  ", " +
                  appt.labSample.sampleCodeVirus}
              </span>
            ) : (
              <span className="font-medium">{appt.labSample.sampleType}</span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Thu thập lúc</span>
            <span className="font-medium">
              {formatStd(appt.labSample.collectedAt)}
            </span>
          </div>
        </div>

        {/* Result Section */}
        {!hasResult ? (
          <div className="flex justify-center py-8">
            <span className="text-gray-400 italic">Đang chờ kết quả</span>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-md font-semibold border-b pb-2">
              Kết quả xét nghiệm
            </h3>

            {/* Numeric or Text Result */}
            {appt.serviceType === "CONSULTATION" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Chỉ số CD4</span>
                  <span className="font-medium">
                    {appt.labResult.resultNumericCD4} cells/mm³
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Tải lượng virus</span>
                  <span className="font-medium">
                    {appt.labResult.resultNumericViralLoad} copies/mL
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Kết quả</span>
                <span className="font-medium">{appt.labResult.resultText}</span>
              </div>
            )}

            {/* Meta Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Ngày có kết quả</span>
                <span className="font-medium">{appt.labResult.resultDate}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Kết luận</span>
                <span className="font-medium flex-1 whitespace-normal break-words">
                  {appt.labResult.conclusion === ""
                    ? "Không có"
                    : appt.labResult.conclusion}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1">
              <span className="text-sm text-gray-500">Ghi chú:</span>
              <span className="font-medium flex-1 whitespace-normal break-words">
                {appt.labResult.note === "" ? "Không có" : appt.labResult.note}
              </span>
            </div>
            <ConfirmResult appt={appt} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const AppointmentSession = ({ appt }: { appt: Appointment }) => {
  return (
    <Tabs>
      <TabsList>
        <TabsTrigger value="service">Dịch vụ</TabsTrigger>
        <TabsTrigger value="lab_rs">Kết quả</TabsTrigger>
        <TabsTrigger value="prescription">Phác đồ</TabsTrigger>
      </TabsList>
      <TabsContent value="service">
        <Card className="w-full shadow-lg">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">
              Mã số: {appt.appointmentCode} - {appt.serviceName}
            </CardTitle>
            <StatusBadge status={appt.status} />
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Bác sĩ phụ trách</span>
              <span className="text-sm font-medium text-gray-800">
                {appt.doctorName === null ? "Không có" : appt.doctorName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Thời gian khám</span>
              <span className="text-sm font-medium text-gray-800">
                {appt.startTime} - {appt.endTime}
              </span>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="lab_rs">
        <LabTestRs appt={appt} />
      </TabsContent>
      <TabsContent value="prescription">
        <Prescription appt={appt} />
      </TabsContent>
    </Tabs>
  );
};

export default AppointmentSession;
