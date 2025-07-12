import { Badge } from "@/components/ui/badge";
import { ChevronDown, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface QuickTip {
  title: string;
  example: string;
  description: string;
}

const QuickMarkdownHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success("Đã sao chép!");
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      toast.error("Không thể sao chép");
    }
  };

  const quickTips: QuickTip[] = [
    {
      title: "Tiêu đề",
      example: "# Tiêu đề chính\n## Tiêu đề phụ\n### Tiêu đề con",
      description: "Sử dụng # để tạo tiêu đề"
    },
    {
      title: "In đậm/nghiêng",
      example: "**Văn bản in đậm**\n*Văn bản in nghiêng*",
      description: "Làm nổi bật thông tin quan trọng"
    },
    {
      title: "Danh sách",
      example: "- Mục 1\n- Mục 2\n  - Mục con\n\n1. Bước 1\n2. Bước 2",
      description: "Tạo danh sách có thứ tự và không thứ tự"
    },
    {
      title: "Trích dẫn",
      example: "> **Lưu ý:** Thông tin quan trọng\n> cần chú ý đặc biệt",
      description: "Làm nổi bật cảnh báo hoặc ghi chú"
    },
    {
      title: "Bảng",
      example: "| Thuốc | Liều | Tần suất |\n|-------|------|----------|\n| ARV | 600mg | 1 lần/ngày |",
      description: "Trình bày dữ liệu có cấu trúc"
    },
    {
      title: "Mã/Thuốc",
      example: "Thuốc: `Efavirenz 600mg`\n\n```\nCD4: 350 cells/μL\nViral Load: Undetectable\n```",
      description: "Hiển thị tên thuốc và số liệu"
    }
  ];

  return (
    <div className="border rounded-lg">
      <Button 
        variant="ghost" 
        size="sm" 
        className="w-full flex items-center justify-between text-xs p-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>💡 Mẹo viết Markdown</span>
        <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>
      
      {isOpen && (
        <div className="p-3 border-t space-y-2">
          <div className="text-xs text-gray-600 mb-2">
            Nhấn vào ví dụ để sao chép vào clipboard:
          </div>
          {quickTips.map((tip, index) => (
            <div key={index} className="border rounded p-2 bg-gray-50">
              <div className="flex items-center justify-between mb-1">
                <Badge variant="secondary" className="text-xs">
                  {tip.title}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(tip.example, index)}
                  className="h-6 px-2 text-xs"
                >
                  {copiedIndex === index ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-gray-600 mb-1">{tip.description}</p>
              <pre className="text-xs bg-white p-1 rounded border font-mono whitespace-pre-wrap">
                {tip.example}
              </pre>
            </div>
          ))}
          <div className="text-xs text-center text-gray-500 mt-2 pt-2 border-t">
            Nhấn "Hướng dẫn Markdown" ở trên để xem hướng dẫn chi tiết
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickMarkdownHelp;
