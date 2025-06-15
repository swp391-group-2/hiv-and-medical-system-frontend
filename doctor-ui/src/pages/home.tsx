import HeaderStats from "@/components/DoctorDashBoard/headerStats";
import PatientList from "@/components/DoctorDashBoard/patientList";
import QuickActions from "@/components/DoctorDashBoard/quickActions";



const Dashboard = () => {
  return (
    <div className="space-y-6 p-6 bg-gray-100 min-h-screen">

        <h1 className="text-2xl font-bold mb-2">Trang chủ</h1>
       
      
      <HeaderStats />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PatientList />
        <QuickActions />
      </div>
    </div>
  );
};

export default Dashboard;
