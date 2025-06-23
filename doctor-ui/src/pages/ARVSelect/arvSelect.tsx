import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import PatientInfoCard from "@/components/ARVSeclectComponent/patientInfoCard";
import LatestTestResultCard from "@/components/ARVSeclectComponent/latestTestResultCard";
import PrescriptionList from "@/components/ARVSeclectComponent/arvProtocolsSection";
import PrescriptionDetailCard from "@/components/ARVSeclectComponent/arvProtocolsDetailCard";
import UpdatePrescriptionItemsModal from "@/components/ARVSeclectComponent/updatePrescriptionItems";
import LabtestParameter from "@/components/ARVSeclectComponent/LabtestParameter";

import {
  fetchARVProtocols,
  fetchPatientAlerts,
  fetchPatientInfo,
} from "@/api/doctorChonPhacDo";

import type { Patient } from "@/types/patientType";
import type { Alerts, LatestTestResult } from "@/types/type";
import type { patientPrescription } from "@/types/prescription";
import type { LabTestParameter } from "@/types/appointment/labTestParameter";

function ARVSeclect() {
  const location = useLocation();
  const rawPatient = location.state?.patient;
  const appointmentId = location.state?.appointmentId;
  const rawLabResult = location.state?.labResult;
  const rawLabParameter = location.state?.labTestParameter;

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

  const [parameter, setParameter] = useState<LabTestParameter | null>(null);
  const [prescriptions, setPrescriptions] = useState<patientPrescription[]>([]);
  const [selectedPrescription, setSelectedPrescription] =
    useState<patientPrescription | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (!patient?.patientId || !appointmentId) return;

      try {
        const [info, alert, prescriptionsRes] = await Promise.all([
          fetchPatientInfo(patient.patientId),
          fetchPatientAlerts(patient.patientId),
          fetchARVProtocols(),
        ]);

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

        if (rawLabParameter) {
          setParameter(rawLabParameter);
        }

        setPatientInfo({
          ...patient,
          weight: info.weight || "Không rõ",
          gender: info.gender || "Không rõ",
        });

        setAlerts(alert);

        const validPrescriptions = prescriptionsRes.filter(
          (pres: any): pres is patientPrescription =>
            !!pres &&
            typeof pres.prescriptionId === "number" &&
            typeof pres.name === "string"
        );
        setPrescriptions(validPrescriptions);
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
  <LabtestParameter  />
</div>


      <PrescriptionList
        prescriptions={prescriptions}
        onSelect={(pres) => setSelectedPrescription(pres)}
        selectedPrescriptionId={selectedPrescription?.prescriptionId ?? null}
      />

      <PrescriptionDetailCard prescription={selectedPrescription} />

      {selectedPrescription && (
        <UpdatePrescriptionItemsModal
          open={showUpdateModal}
          onOpenChange={setShowUpdateModal}
          prescription={selectedPrescription}
          appointmentId={appointmentId}
          onUpdated={async () => {
            setShowUpdateModal(false);
          }}
        />
      )}

      {selectedPrescription && (
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setShowUpdateModal(true)}
          >
            Kê đơn thuốc
          </button>
        </div>
      )}
    </div>
  );
}

export default ARVSeclect;
