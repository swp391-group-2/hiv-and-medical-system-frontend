import PatientListPending from "@/components/doctorPendingApoinment/patientListPending";
import TopHeaderPending from "@/components/doctorPendingApoinment/topHeaderPending";


const PendingAppointment = () => {
  return (

     <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-2">Xét nghiệm chờ kết quả</h1>
        <p className="text-gray-600 mb-6">Cập nhật kết quả xét nghiệm</p>
        <TopHeaderPending />
        <PatientListPending />
      </main>
  );
};

export default PendingAppointment;
