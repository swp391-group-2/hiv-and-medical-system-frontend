import AppointmentList from "@/components/DoctorSchedule/doctorScheduleApoiList";
import TabSwitcher from "@/components/DoctorSchedule/TabSwitcher";
import React, { useState } from "react";
import type { Appointment } from "./Appointment";

const Schedule: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<"today" | "upcoming">("today");

  const data: Record<"today" | "upcoming", Appointment[]> = {
    today: [
      {
        name: "Nguyễn Văn A",
        code: "BN001",
        time: "08:30",
        phone: "0123456789",
        address: "123 Đường ABC, Q1, HCM",
        note: "Tái khám định kỳ, kiểm tra CD4",
        type: "Định kỳ",
        status: "Hoàn thành",
      },
      {
        name: "Trần Thị B",
        code: "BN002",
        time: "09:15",
        phone: "0987654321",
        address: "456 Đường XYZ, Q3, HCM",
        note: "Bệnh nhân có triệu chứng sốt cao",
        type: "Khẩn cấp",
        status: "Đang khám",
      },
      {
        name: "Lê Văn C",
        code: "BN003",
        time: "10:00",
        phone: "0369852147",
        address: "789 Đường DEF, Q5, HCM",
        note: "Theo dõi sau thay đổi phác đồ",
        type: "Tái khám",
        status: "Chờ khám",
      },
    ],
    upcoming: [],
  };

  return (
    <main className="flex-1 p-8">
      <h1 className="text-2xl font-bold mb-2">Lịch khám bệnh</h1>
      
      <TabSwitcher currentTab={currentTab} onTabChange={setCurrentTab} />
      <AppointmentList appointments={data[currentTab]} />
    </main>
  );
};

export default Schedule;
