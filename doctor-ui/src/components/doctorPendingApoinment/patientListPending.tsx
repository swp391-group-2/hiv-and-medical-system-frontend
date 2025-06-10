
import React from 'react';

import PatientItemPending from './patientItemPending';


const patients = [
  { name: 'Trần Thị Bình', id: 'BN002', sampleCode: 'CONFO01', resultLabel: 'Kháng định', resultColor: 'red', date: '15/1/2024', doctor: 'BS. Trần Thị B' },
  { name: 'Nguyễn Văn An', id: 'BN001', sampleCode: 'SCREEN001', resultLabel: 'Sàng lọc', resultColor: 'blue', date: '15/1/2024', doctor: 'BS. Nguyễn Văn A' },
  { name: 'Lê Văn Cường', id: 'BN003', sampleCode: 'CD4001', resultLabel: 'CD4', resultColor: 'green', date: '14/1/2024', doctor: 'BS. Lê Văn C' },
  { name: 'Phạm Thị Dung', id: 'BN004', sampleCode: 'VL001', resultLabel: 'Tải lượng Virus', resultColor: 'yellow', date: '14/1/2024', doctor: 'BS. Phạm Thị D' },
];

const PatientListPending = () => {
  return (
    <div className="bg-white border rounded p-4">
      <h2 className="font-bold text-lg mb-4">Danh sách chờ kết quả ({patients.length})</h2>
      <input
        type="text"
        placeholder="Tìm kiếm tên, mã BN, mã mẫu..."
        className="w-full border rounded px-3 py-2 mb-4"
      />
      {patients.map((patient) => (
        <PatientItemPending key={patient.id} {...patient} />
      ))}
    </div>
  );
};

export default PatientListPending;
