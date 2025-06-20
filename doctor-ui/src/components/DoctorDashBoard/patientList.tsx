import { useEffect, useState } from "react";
import {  getAllAppointmentsByDoctor } from "@/api/doctorDashboardAPI";
import PatientCard from "./patientCard";
import type { Appointment } from "@/types/appointment/appointment";

const PatientList = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAllAppointmentsByDoctor();

        const today = new Date().toISOString().split("T")[0];

        // Lọc các lịch hẹn hôm nay
        const todayAppointments = (data as Appointment[]).filter(
          (a: Appointment) => a.date === today
        );

        setAppointments(todayAppointments);
      } catch (error) {
        console.error("Không thể tải danh sách lịch hẹn:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold mb-4">👥 Bệnh nhân hôm nay</h2>
      <div className="space-y-4">
        {appointments.map((appointment, index) => (
          <PatientCard
            key={appointment.appointmentId || index}
            appointment={appointment}
          />
        ))}
      </div>
      <button className="mt-4 text-center w-full text-sm text-blue-600 hover:underline">
        Xem tất cả lịch hẹn
      </button>
    </div>
  );
};

export default PatientList;
