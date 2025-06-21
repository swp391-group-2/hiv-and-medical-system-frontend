import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

const recentActivities = [
  {
    action: "Cập nhật lịch làm việc",
    user: "BS. Hoàng Văn E",
    time: "2 phút trước",
  },
  {
    action: "Hoàn thành ca trực",
    user: "Staff Nguyễn Thị F",
    time: "15 phút trước",
  },
  { action: "Báo cáo ca bệnh", user: "BS. Trần Văn G", time: "1 giờ trước" },
  { action: "Cập nhật thông tin", user: "Staff Lê Thị H", time: "2 giờ trước" },
];

const RecentActivities = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hoạt động gần đây</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border-l-4 border-green-500 bg-green-50"
            >
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.user}</p>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
