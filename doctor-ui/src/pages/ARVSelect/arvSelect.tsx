import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import PatientInfoCard from "@/components/ARVSeclectComponent/patientInfoCard";
import LatestTestResultCard from "@/components/ARVSeclectComponent/latestTestResultCard";
import AlertsCard from "@/components/ARVSeclectComponent/aleartsCard";
import TreatmentHistoryCard from "@/components/ARVSeclectComponent/treatmentHistoryCard";
import PrescriptionList from "@/components/ARVSeclectComponent/arvProtocolsSection";
import PrescriptionDetailCard from "@/components/ARVSeclectComponent/arvProtocolsDetailCard";

import {
  fetchAppointmentDetail,
  fetchARVProtocols,
  fetchPatientAlerts,
  fetchPatientInfo,
  selectPrescription,
  updatePrescription,
} from "@/api/doctorChonPhacDo";

import type { Patient } from "@/types/patientType";
import type { Alerts, LatestTestResult, TreatmentHistory } from "@/types/type";
import type { Prescription } from "@/types/prescription";

function ARVSeclect() {
  const location = useLocation();
  const rawPatient = location.state?.patient;
  const appointmentId = location.state?.appointmentId;
  const rawLabResult = location.state?.labResult;

  const patient: Patient = {
    patientId: rawPatient?.patientId || "Không rõ",
    fullName: rawPatient?.fullName || "Không rõ",
    patientCode: rawPatient?.patientCode,
    dob: rawPatient?.dob || "Không rõ",
  };

  const [patientInfo, setPatientInfo] = useState<Patient>(patient);
  const [alerts, setAlerts] = useState<Alerts>({
    allergy: "Không rõ",
    comorbid: "Không rõ",
  });
  const [result, setResult] = useState<LatestTestResult>({
    cd4: 0,
    viralLoad: "Không rõ",
    date: "Không rõ",
  });
  const [history, setHistory] = useState<TreatmentHistory>({
    protocol: "Không rõ",
    status: "Chưa có dữ liệu",
    time: "Không rõ",
    duration: "Không rõ",
    notes: "-",
  });
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [selectedPrescription, setSelectedPrescription] =
    useState<Prescription | null>(null);

  useEffect(() => {
    const init = async () => {
      if (!patient?.patientId || !appointmentId) return;

      try {
        const [info, alert, prescriptionsRes] = await Promise.all([
          fetchPatientInfo(patient.patientId),
          fetchPatientAlerts(patient.patientId),
          fetchARVProtocols(),
          console.log(appointmentId),
        ]);

        // Ưu tiên lab result từ location nếu có
        if (rawLabResult) {
          setResult({
            cd4: rawLabResult.resultNumericCD4 ?? "Không rõ",
            viralLoad: rawLabResult.resultNumericViralLoad ?? "Không rõ",
            date: rawLabResult.resultDate ?? "Không rõ",
          });
        } else {
          setResult({
            cd4: info.cd4 ?? "Không rõ",
            viralLoad: info.viralLoad ?? "Không rõ",
            date: info.updatedAt?.split("T")[0] ?? "Không rõ",
          });
        }

        setPatientInfo({
          ...patient,
          weight: info.weight || "Không rõ",
          gender: info.gender || "Không rõ",
        });

        setAlerts(alert);

        const validPrescriptions = prescriptionsRes.filter(
          (pres: any): pres is Prescription =>
            !!pres &&
            typeof pres.prescriptionId === "number" &&
            typeof pres.name === "string"
        );
        setPrescriptions(validPrescriptions);

        if (info.treatmentHistory) {
          setHistory({
            protocol: info.treatmentHistory.protocol || "Không rõ",
            status: info.treatmentHistory.status || "Không rõ",
            time: info.treatmentHistory.time || "Không rõ",
            duration: info.treatmentHistory.duration || "Không rõ",
            notes: info.treatmentHistory.notes || "-",
          });
        }
      } catch (error) {
        console.error("❌ Lỗi khi load dữ liệu:", error);
      }
    };

    init();
  }, [patient.patientId, appointmentId]);

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

      <PrescriptionList
        prescriptions={prescriptions}
        onSelect={(pres) => setSelectedPrescription(pres)}
        selectedPrescriptionId={selectedPrescription?.prescriptionId ?? null}
      />

      <PrescriptionDetailCard prescription={selectedPrescription} />

      {selectedPrescription && (
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={async () => {
              try {
                const appointment = await fetchAppointmentDetail(appointmentId);

                if (appointment.prescription) {
                  const confirmUpdate = confirm(
                    "⚠️ Bệnh nhân đã có phác đồ. Cập nhật lại?"
                  );
                  if (!confirmUpdate) return;

                  await updatePrescription(
                    appointmentId,
                    selectedPrescription.prescriptionId
                  );
                  alert("✅ Cập nhật phác đồ thành công!");
                } else {
                  await selectPrescription(
                    appointmentId,
                    selectedPrescription.prescriptionId
                  );
                  alert("✅ Chọn phác đồ thành công!");
                }
              } catch (err: any) {
                console.error(
                  "❌ Lỗi khi xử lý phác đồ:",
                  err.response?.data || err
                );
                alert(
                  "❌ Thao tác thất bại: " + (err.response?.data?.message || "")
                );
              }
            }}
          >
            Xác nhận chọn phác đồ
          </button>
        </div>
      )}
    </div>
  );
}

export default ARVSeclect;
