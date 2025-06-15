import React, { useEffect, useState } from "react";
import PatientListPending from "@/components/doctorPendingApoinment/patientListPending";
import { TopHeaderPending } from "@/components/doctorPendingApoinment/topHeaderPending";
import { fetchPendingAppointments } from "@/api/doctorPendingAPI";
import type { Appointment } from "@/types/appointment/appointment";

const PendingAppointment: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const filtered = await fetchPendingAppointments();
        setAppointments(filtered);
        console.log("Fetched appointments:", filtered);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <main className="flex-1 p-8 w-full">
      <h1 className="text-2xl font-bold mb-2">Xét nghiệm Khám</h1>
      <p className="text-gray-600 mb-6">Cập nhật kết quả xét nghiệm</p>
      <TopHeaderPending total={appointments.length} />
      <PatientListPending appointments={appointments} loading={loading} />
    </main>
  );
};

export default PendingAppointment;
