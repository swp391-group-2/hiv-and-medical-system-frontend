import ServiceTestPage from "@/components/tests/ServiceTestPage";

export default function ServiceScreeningTest() {
  return (
    <ServiceTestPage
      title="Xét nghiệm sàng lọc HIV"
      price="160.000đ"
      image="https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.88931xw:1xh;center,top&resize=1200:*"
      resultTime="Có kết quả từ 1 - 3 ngày"
      notes={["Thông tin bảo mật riêng tư", "Nhận kết quả trong hồ sơ điện tử"]}
      testPurposes={[
        "Sàng lọc HIV giai đoạn sớm (giai đoạn phơi nhiễm sau 18 ngày)",
        "Phát hiện dấu hiệu virus HIV giai đoạn đầu",
      ]}
      Span={[
        "Độ chính xác cao, xét nghiệm HIV nhanh và bảo mật",
        "Có kết quả từ 1 - 3 ngày",
        "Nhận kết quả trong hồ sơ điện tử của hệ thống",
      ]}
      targetAudiences={[
        "Quan hệ tình dục không an toàn",
        "Mắc các bệnh xã hội, bệnh lây truyền qua đường tình dục",
        "Chấn thương hoặc chia sẻ kim tiêm",
        "Hoạt động lao động tình dục",
        "Người có quan hệ đồng giới (MSM)",
        "Người có nhiều bạn tình",
        "Phụ nữ mang thai",
      ]}
      methods={[
        "Xét nghiệm HIV PCR (sinh học phân tử)",
        "Xét nghiệm HIV Combo Ag/Ab (Test nhanh tìm kháng nguyên Ag và kháng thể Ab)",
        "Xét nghiệm HIV Ab (Kháng thể HIV) hoặc HIV Combo Ag/Ab",
      ]}
      resultDurationEx={["Từ 7-17 ngày", "Từ 15-90 ngày", "sau 90 ngày"]}
      sampleType="Máu"
      resultDuration="1-3 ngày có kết quả xem trực tiếp tại hệ thống"
      fastingRequired="Không cần nhịn ăn trước khi lấy mẫu xét nghiệm"
    />
  );
}
