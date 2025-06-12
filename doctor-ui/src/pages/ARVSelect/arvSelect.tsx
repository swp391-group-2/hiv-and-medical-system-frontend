import { useState } from 'react';
import type { Alerts, LatestTestResult, PatientInfo, Protocol, TreatmentHistory } from './type';
import PatientInfoCard from '@/components/ARVSeckectComponent/patientInfoCard';
import LatestTestResultCard from '@/components/ARVSeckectComponent/latestTestResultCard';
import AlertsCard from '@/components/ARVSeckectComponent/aleartsCard';
import TreatmentHistoryCard from '@/components/ARVSeckectComponent/treatmentHistoryCard';
import ARVProtocolsSection from '@/components/ARVSeckectComponent/arvProtocolsSection';
import ARVProtocolDetailCard from '@/components/ARVSeckectComponent/arvProtocolsDetailCard';



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

      <ARVProtocolsSection protocols={protocols} onSelect={setSelectedProtocol} />

      <ARVProtocolDetailCard protocol={selectedProtocol} />
    </div>
  );
}

export default ARVSeclect;