import React, { useEffect, useState } from "react";
import TabSwitcher from "@/components/DoctorSchedule/tabSwitcher";
import AppointmentList from "@/components/DoctorSchedule/doctorScheduleApoiList";
import { fetchDoctorAppointments } from "@/api/doctorSchedule";
import type { DoctorScheduleAppointment } from "@/types/schedule/doctorScheduleAppointment";

const Schedule: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<"today" | "upcoming">("today");
  const [appointments, setAppointments] = useState<DoctorScheduleAppointment[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const now = new Date();

      if (currentTab === "upcoming") {
        now.setDate(now.getDate() + 1);
      }

      const formattedDate = now.toISOString().split("T")[0]; // "YYYY-MM-DD"

      // 🔥 Dùng đúng status hợp lệ
      const status = currentTab === "today" ? "LAB_COMPLETED" : "COMPLETED";

      console.log("📆 Fetching for:", formattedDate, "status:", status);

      try {
        setLoading(true);
        const data = await fetchDoctorAppointments(formattedDate, status);
        setAppointments(data);
      } catch (err) {
        console.error("Không thể load lịch khám:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentTab]);

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
