import React from "react";
import PatientDialog from "./patientDialogA";


// Thêm Tab UI nếu bạn có sẵn, ví dụ dùng @headlessui/react hoặc tự code


interface PatientItemProps {
  name: string;
  id: string;
  sampleCode: string;
  resultLabel: string;
  resultColor: string;
  date: string;
  doctor: string;
}

const PatientItemPending: React.FC<PatientItemProps> = ({
  name,
  id,
  sampleCode,
  resultLabel,
  resultColor,
  date,
  doctor,
}) => {
  

  // Giả lập dữ liệu
  const age = 30;
  const gender = "Nam";
  const viralLoad = "1200 copies/mL";
  const cd4 = "350 cells/mm³";

  return (
    <div className="flex justify-between items-center border rounded p-4 mb-2 hover:bg-gray-50">
      <div>
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-gray-600">
          Mã BN: {id} | Mã mẫu: {sampleCode}
        </div>
        <div className="text-sm text-gray-600 mt-1">
          <span
            className={`inline-block px-2 py-0.5 text-xs rounded bg-${resultColor}-100 text-${resultColor}-800 mr-2`}
          >
            {resultLabel}
          </span>
          {date} | BS: {doctor}
        </div>
      </div>

      <PatientDialog
        name={name}
        id={id}
        sampleCode={sampleCode}
        resultLabel={resultLabel}
        resultColor={resultColor}
        date={date}
        doctor={doctor}
        age={age}
        gender={gender}
        viralLoad={viralLoad}
        cd4={cd4}
      />
    </div>
  );
};

export default PatientItemPending;
