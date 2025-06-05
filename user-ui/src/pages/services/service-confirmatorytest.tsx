import TestHeader from "@/components/tests/ServiceTestPage";

function ServiceConfirmatoryTest() {
  return (
    <div>
      <TestHeader
        title="Xét nghiệm khẳng định HIV"
        price="400.000đ"
        image="https://images.squarespace-cdn.com/content/5dc57f17365d8a7fb9f03010/1573501410841-UKLPX6JFHJ9R27QHQC5L/Microscope-Care-and-Maintenance-1-960x640.jpg?content-type=image%2Fjpeg"
        resultTime="Có kết quả từ 3 - 7 ngày"
        notes={[
          "Thông tin bảo mật riêng tư",
          "Nhận kết quả trong hồ sơ điện tử",
        ]}
        testPurposes={[
          "Dành cho trường hợp sau khi test Combo HIV Ag/Ab, kit test có phản ứng hoặc dương tính sẽ tiến hành xét nghiệm khẳng định HIV",
        ]}
        Span={[
          "Độ chính xác cao, xét nghiệm HIV nhanh và bảo mật",
          "Có kết quả từ 3 - 7 ngày",
          "Nhận kết quả trong hồ sơ điện tử của hệ thống",
        ]}
        targetAudiences={[
          "Người sau khi test nhanh HIV có phản ứng / Dương tính",
          "Mắc các bệnh xã hội, bệnh lây nhiễm qua đường tình dục",
          "Người quan hệ tình dục không an toàn, có nhiều bạn tình",
          "Người chấn thương hoặc chia sẻ kim tiêm",
          "Người hoạt động lao động tình dục",
          "Nhóm quan hệ đồng giới (MSM)",
          "Trẻ em sinh ra từ mẹ nhiễm HIV",
          "Phụ nữ mang thai",
        ]}
        sampleType="Máu"
        resultDuration="60 phút có kết quả"
        fastingRequired="Không cần nhịn ăn trước khi lấy mẫu xét nghiệm"
      />
    </div>
  );
}

export default ServiceConfirmatoryTest;
