import { useState } from 'react';
import type { Alerts, LatestTestResult, PatientInfo, Protocol, TreatmentHistory } from './type';
import PatientInfoCard from '@/components/ARVSeclectComponent/patientInfoCard';
import LatestTestResultCard from '@/components/ARVSeclectComponent/latestTestResultCard';
import AlertsCard from '@/components/ARVSeclectComponent/aleartsCard';
import TreatmentHistoryCard from '@/components/ARVSeclectComponent/treatmentHistoryCard';
import ARVProtocolsSection from '@/components/ARVSeclectComponent/arvProtocolsSection';
import ARVProtocolDetailCard from '@/components/ARVSeclectComponent/arvProtocolsDetailCard';


function ARVSeclect() {
  const patientInfo: PatientInfo = {
    id: 'BN0001',
    name: 'Nguyễn Văn A',
    age: 35,
    weight: '65kg',
  };

  const result: LatestTestResult = {
    cd4: 450,
    viralLoad: '<50',
    date: '20/12/2024',
  };

  const alerts: Alerts = {
    allergy: 'Sulfonamide',
    comorbid: 'Viêm gan B',
  };

  const history: TreatmentHistory = {
    protocol: 'AZT/3TC/NVP',
    status: 'Ngừng điều trị',
    time: '15/03/2023 - 15/09/2024',
    duration: '6 tháng',
    notes: 'Tác dụng phụ nghiêm trọng - thiếu máu',
  };

  const protocols: Protocol[] = [
    {
      id: '1',
      name: 'TDF/3TC/EFV',
      ingredients: ['Tenofovir 300mg', 'Lamivudine 300mg', 'Efavirenz 600mg'],
      level: '1',
      notes: [],
    },
    {
      id: '2',
      name: 'ABC/3TC/DTG',
      ingredients: ['Abacavir 600mg', 'Lamivudine 300mg', 'Dolutegravir 50mg'],
      level: '1',
      notes: ['HLA-B*5701 dương tính', 'Suy gan nặng'],
    },
  ];

  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null);

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PatientInfoCard patientInfo={patientInfo} />
        <LatestTestResultCard result={result} />
        <div className="space-y-4">
          <AlertsCard alerts={alerts} />
          <TreatmentHistoryCard history={history} />
        </div>
      </div>

      <ARVProtocolsSection protocols={protocols} onSelect={setSelectedProtocol} />

      <ARVProtocolDetailCard protocol={selectedProtocol} />
    </div>
  );
}

export default ARVSeclect;
