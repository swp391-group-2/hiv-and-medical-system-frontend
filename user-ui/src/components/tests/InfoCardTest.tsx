import { CalendarCheck, ShieldCheck, Zap } from "lucide-react";

interface InfoCardTestProps {
  Span: string[];
}

const InfoCardTest = ({ Span }: InfoCardTestProps) => {
  const cards = [
    {
      icon: Zap,
      text: Span[0],
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
    {
      icon: CalendarCheck,
      text: Span[1],
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: ShieldCheck,
      text: Span[2],
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map(({ icon: Icon, text, color, bgColor }, index) => (
        <div
          key={index}
          className="group flex items-center gap-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-gray-200"
        >
          <div
            className={`p-3 rounded-xl ${bgColor} group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className={`w-6 h-6 ${color}`} />
          </div>
          <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
            {text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default InfoCardTest;
