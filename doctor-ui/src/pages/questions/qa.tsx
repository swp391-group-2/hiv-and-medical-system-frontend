import StatsBox from "@/components/AnonnymusQA/tagQA";
import type { Question, StatsItem } from "../../types/qaType";
import QuestionCard from "@/components/AnonnymusQA/questionCard";

const stats: StatsItem[] = [
  { label: "Chờ trả lời", count: 3, description: "Câu hỏi mới" },
  { label: "Đã trả lời", count: 1, description: "Đã tư vấn" },
  { label: "Chuyển khoa", count: 0, description: "Cần chuyển khoa" },
  { label: "Tổng câu hỏi", count: 4, description: "Tất cả bài đăng" },
];

const questions: Question[] = [
  {
    id: "1",
    title: "CD4 của tôi là 180, có nguy hiểm không?",
    content:
      "Kết quả xét nghiệm CD4 của tôi là 180 cells/μL. Bác sĩ nói cần bắt đầu điều trị ngay. Tôi có thể chờ thêm một thời gian không? Tôi đang rất bận công việc.",
    topic: "Điều trị",
    urgency: "Khẩn cấp",
    category: "Chờ trả lời",
    tags: ["CD4 thấp", "điều trị khẩn cấp", "trì hoãn"],
    views: 8,
    likes: 1,
    createdAt: "25/5/2025",
    gender: "Nam",
    age: 42,
  },
  {
    id: "2",
    title: "Tôi vừa được chẩn đoán HIV, tôi có thể sống bao lâu?",
    content:
      "Tôi 28 tuổi, vừa được xét nghiệm và phát hiện HIV dương tính. Tôi rất hoang mang và sợ hãi. Tôi có thể sống bao lâu? Có cách nào điều trị không?",
    topic: "Tổng quát",
    urgency: "Cao",
    category: "Chờ trả lời",
    tags: ["chẩn đoán mới", "lâu dài", "tiên lượng"],
    views: 15,
    likes: 3,
    createdAt: "25/5/2025",
    gender: "Nam",
    age: 28,
  },
  {
    id: "3",
    title: "Làm sao để nói với người yêu về tình trạng HIV của mình?",
    content:
      "Tôi đang yêu một người và muốn nghiêm túc với họ. Nhưng tôi không biết làm sao để nói về việc mình có HIV. Tôi sợ họ sẽ bỏ tôi. Bác sĩ có thể tư vấn giúp tôi không?",
    topic: "Sức khỏe tâm thần",
    urgency: "Trung bình",
    category: "Chờ trả lời",
    tags: ["tâm lý", "mối quan hệ", "tiết lộ"],
    views: 22,
    likes: 5,
    createdAt: "25/5/2025",
    gender: "Nữ",
    age: 26,
  },
];

const Questions = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-1">Tư vấn ẩn danh</h1>
      <p className="text-sm text-gray-600 mb-4">
        Trả lời câu hỏi và tư vấn cho bệnh nhân HIV
      </p>

      {/* Stats */}
      <div className="flex flex-wrap gap-4 mb-6">
        {stats.map((s) => (
          <StatsBox key={s.label} item={s} />
        ))}
      </div>

      {/* Questions */}
      <div>
        {questions.map((q) => (
          <QuestionCard key={q.id} question={q} />
        ))}
      </div>
    </div>
  );
};

export default Questions;
