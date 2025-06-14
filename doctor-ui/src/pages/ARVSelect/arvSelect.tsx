import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import PatientInfoCard from "@/components/ARVSeckectComponent/patientInfoCard";
import LatestTestResultCard from "@/components/ARVSeckectComponent/latestTestResultCard";
import AlertsCard from "@/components/ARVSeckectComponent/aleartsCard";
import TreatmentHistoryCard from "@/components/ARVSeckectComponent/treatmentHistoryCard";
import ARVProtocolsSection from "@/components/ARVSeckectComponent/arvProtocolsSection";
import ARVProtocolDetailCard from "@/components/ARVSeckectComponent/arvProtocolsDetailCard";

import { fetchARVProtocols, fetchPatientAlerts, fetchPatientInfo, selectPrescription } from "@/api/doctorChonPhacDo";
import type { Alerts, LatestTestResult, PatientInfo, Protocol, TreatmentHistory } from "@/types/ARVtype";

function ARVSeclect() {
  const location = useLocation();
  const patient = location.state?.patient;
  const appointmentId = location.state?.appointmentId;

  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    id: "Không rõ",
    name: "Không rõ",
    age: 0,
    weight: "Không rõ",
  });
  const [alerts, setAlerts] = useState<Alerts>({
    allergy: "Không rõ",
    comorbid: "Không rõ",
  });
  const [result, setResult] = useState<LatestTestResult>({
    cd4: 0,
    viralLoad: "Không rõ",
    date: "Không rõ",
  });
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null);
  const [history, setHistory] = useState<TreatmentHistory>({
    protocol: "Không rõ",
    status: "Chưa có dữ liệu",
    time: "Không rõ",
    duration: "Không rõ",
    notes: "-",
  });

  useEffect(() => {
    const init = async () => {
      if (!patient?.patientId || !appointmentId) return;

      const [info, alert, protocolsRes] = await Promise.all([
        fetchPatientInfo(patient.patientId),
        fetchPatientAlerts(patient.patientId),
        fetchARVProtocols(),
      ]);

      // Cập nhật dữ liệu bệnh nhân
      setPatientInfo({
        id: patient.patientCode || "Không rõ",
        name: patient.fullName || "Không rõ",
        age: calculateAge(patient.dob),
        weight: info.weight || "Không rõ",
      });

      setAlerts(alert);

      setResult({
        cd4: info.cd4 || 0,
        viralLoad: info.viralLoad || "Không rõ",
        date: info.updatedAt?.split("T")[0] || "Không rõ",
      });

      setProtocols(protocolsRes);

      if (info?.treatmentHistory) {
        setHistory({
          protocol: info.treatmentHistory.protocol || "Không rõ",
          status: info.treatmentHistory.status || "Không rõ",
          time: info.treatmentHistory.time || "Không rõ",
          duration: info.treatmentHistory.duration || "Không rõ",
          notes: info.treatmentHistory.notes || "-",
        });
      }
    };

    init();
  }, [patient, appointmentId]);

  const calculateAge = (dob: string) => {
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleSelectProtocol = async (protocol: Protocol) => {
    setSelectedProtocol(protocol);
    try {
      await selectPrescription(appointmentId, protocol.id);
      alert("Chọn phác đồ thành công!");
    } catch (err) {
      console.error(err);
      alert("Chọn phác đồ thất bại!");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-2">Chọn phác đồ ARV</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PatientInfoCard patientInfo={patientInfo} />
        <LatestTestResultCard result={result} />
        <div className="space-y-4">
          <AlertsCard alerts={alerts} />
          <TreatmentHistoryCard history={history} />
        </div>
      </div>

      <ARVProtocolsSection protocols={protocols} onSelect={handleSelectProtocol} />

      <ARVProtocolDetailCard protocol={selectedProtocol} />
    </div>
  );
}

export default ARVSeclect;
