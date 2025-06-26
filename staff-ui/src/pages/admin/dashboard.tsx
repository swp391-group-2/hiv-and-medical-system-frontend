import AppointmentStatSection from "@/components/service-type-stat";
import RecentActivities from "@/components/dashboard-recent-activities";
import FavouriteDoctors from "@/components/favourite-doctors";
import { StatCardsSection } from "@/components/stat-card-section";
import { appointmentStats } from "@/pending-resource/sample-data";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col gap-4">
      <StatCardsSection />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AppointmentStatSection list={appointmentStats} />
        <FavouriteDoctors />
      </div>
      <RecentActivities />
    </div>
  );
};

export default AdminDashboard;
