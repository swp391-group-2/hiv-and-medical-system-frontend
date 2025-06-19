import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

type StatCardStaticProps = {
  title: string;
  icon: LucideIcon;
  value: string;
  change: string;
  isGrowing: boolean;
  color: string;
};

const stats = [
  {
    title: "Tổng khách hàng",
    icon: Users,
    value: "24",
    change: "+2",
    color: "text-blue-600",
  },
  {
    title: "Bác sĩ hoạt động",
    icon: UserCheck,
    value: "24",
    change: "+2",
    color: "text-green-600",
  },
  {
    title: "Lịch hẹn hôm nay",
    icon: Calendar,
    value: "24",
    change: "+2",
    color: "text-purple-600",
  },
  {
    title: "Doanh thu tháng",
    icon: TrendingUp || TrendingDown,
    value: "24",
    change: "+2",
    isGrowing: true,
    color: "text-orange-600",
  },
] as StatCardStaticProps[];

export const StatCard = ({
  index,
  stat,
}: {
  index: string;
  stat: StatCardStaticProps;
}) => {
  return (
    <Card key={index}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-green-600">{stat.change}</p>
          </div>
          {stat.title === "Doanh thu tháng" ? (
            stat.isGrowing ? (
              <TrendingUp className={`h-8 w-8 ${stat.color}`} />
            ) : (
              <TrendingDown className={`h-8 w-8 ${stat.color}`} />
            )
          ) : (
            <stat.icon className={`h-8 w-8 ${stat.color}`} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export function StatCardsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((item) => (
        <StatCard index={item.title} stat={item} />
      ))}
    </div>
  );
}
