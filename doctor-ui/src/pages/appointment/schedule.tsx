import React, { useEffect, useState } from "react";
import TabSwitcher from "@/components/DoctorSchedule/tabSwitcher";
import AppointmentList from "@/components/DoctorSchedule/doctorScheduleApoiList";
import { fetchDoctorSchedule } from "@/api/doctorSchedule";
import type { DoctorScheduleAppointment } from "@/types/schedule/doctorScheduleAppointment";

const Schedule: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<"today" | "upcoming">("today");
  const [appointments, setAppointments] = useState<DoctorScheduleAppointment[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ Gán cứng doctorId (tạm thời, vì endpoint /myInfo không tồn tại)
  const doctorId = "8976eb8d-c827-4652-85d7-754fcb144a23";

  useEffect(() => {
    const fetchData = async () => {
      if (!doctorId) return;

      const date = new Date();
      if (currentTab === "upcoming") {
        date.setDate(date.getDate() + 1); // ngày mai
      }

      const formattedDate = date.toISOString().split("T")[0];

      try {
        setLoading(true);
        const data = await fetchDoctorSchedule(doctorId, formattedDate);
        setAppointments(data);
      } catch (err) {
        console.error("Không thể load lịch", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentTab, doctorId]);

  return (
    <main className="flex-1 p-8">
      <h1 className="text-2xl font-bold mb-2">Lịch khám bệnh</h1>
      <TabSwitcher currentTab={currentTab} onTabChange={setCurrentTab} />

      {loading ? (
        <p>Đang tải lịch khám...</p>
      ) : (
        <AppointmentList appointments={appointments} />
      )}
    </main>
  );
};

export default Schedule;
