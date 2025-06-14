// src/pages/appointment/Schedule.tsx
import React, { useEffect, useState } from "react";
import TabSwitcher from "@/components/DoctorSchedule/tabSwitcher";
import AppointmentList from "@/components/DoctorSchedule/doctorScheduleApoiList";
import { fetchDoctorSchedule, getMyDoctorInfo } from "@/api/doctorSchedule";

import type { Appointment } from "@/types/appointment";

const Schedule: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<"today" | "upcoming">("today");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [doctorId, setDoctorId] = useState<string>("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const data = await getMyDoctorInfo();
        setDoctorId(data.result.doctorId);
      } catch (err) {
        console.error("Không thể lấy thông tin bác sĩ từ token", err);
      }
    };

    fetchDoctor();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!doctorId) return;
      try {
        setLoading(true);
        const today = new Date().toISOString().split("T")[0]; // yyyy-MM-dd
        const data = await fetchDoctorSchedule(doctorId, today);
        setAppointments(data);
      } catch (error) {
        console.error("Lỗi lấy lịch khám:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentTab === "today") {
      fetchData();
    } else {
      setAppointments([]);
    }
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
