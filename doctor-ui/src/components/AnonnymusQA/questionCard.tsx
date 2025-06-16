import type { Question } from "@/types/qaType";

interface QuestionCardProps {
  question: Question;
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm border mb-4">
      <h2 className="text-lg font-bold">{question.title}</h2>

      <div className="flex flex-wrap gap-2 mt-2">
        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
          {question.topic}
        </span>
        <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">
          {question.urgency}
        </span>
        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
          {question.category}
        </span>

        {question.tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-sm text-gray-700 mt-3">{question.content}</p>

      <div className="flex justify-end items-center text-xs text-gray-400 mt-4 space-x-4">
        <span>👁 {question.views}</span>
        <span>❤️ {question.likes}</span>
        <span>{question.createdAt}</span>
        <span>
          {question.gender}, {question.age} tuổi
        </span>
      </div>
    </div>
  );
};

export default QuestionCard;
