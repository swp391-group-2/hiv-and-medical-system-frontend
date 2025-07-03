import ServiceTypeStatSection from "@/components/service-type-stat";
import RecentActivities from "@/components/dashboard-recent-activities";
import FavouriteDoctors from "@/components/favourite-doctors";
import { StatCardsSection } from "@/components/stat-card-section";
import { WeeklyStatsChart } from "@/components/weekly-stats-chart";
import { useServiceTypeStats } from "@/api/stats";

const ManagerDashboard = () => {
  const { data: serviceTypeStat, isLoading } = useServiceTypeStats();
  return (
    <div className="flex flex-col gap-4">
      <StatCardsSection />
      <WeeklyStatsChart />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ServiceTypeStatSection list={serviceTypeStat} isLoading={isLoading} />

        <FavouriteDoctors />
      </div>
      <RecentActivities />
    </div>
  );
};

export default ManagerDashboard;
