import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BasicModal from "@/components/Modal/basicModal";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  BookOpen, 
  Copy, 
  Check,
  Type,
  List,
  Image,
  Link,
  Code,
  Table,
  Quote,
  Hash
} from "lucide-react";
import { toast } from "sonner";

interface MarkdownExample {
  title: string;
  description: string;
  markdown: string;
  preview: string;
  icon: React.ReactNode;
}

const MarkdownGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      toast.success("Đã sao chép vào clipboard!");
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      toast.error("Không thể sao chép");
    }
  };

  const basicExamples: MarkdownExample[] = [
    {
      title: "Tiêu đề",
      description: "Tạo các cấp độ tiêu đề khác nhau",
      icon: <Hash className="h-4 w-4" />,
      markdown: `# Tiêu đề chính (H1)
## Tiêu đề phụ (H2)  
### Tiêu đề con (H3)
#### Tiêu đề nhỏ (H4)`,
      preview: "Hiển thị từ lớn đến nhỏ theo thứ tự"
    },
    {
      title: "Định dạng văn bản",
      description: "In đậm, in nghiêng, gạch chân",
      icon: <Type className="h-4 w-4" />,
      markdown: `**Văn bản in đậm**
*Văn bản in nghiêng*
***Văn bản vừa đậm vừa nghiêng***
~~Văn bản gạch ngang~~
<u>Văn bản gạch chân</u>`,
      preview: "Các kiểu định dạng văn bản khác nhau"
    },
    {
      title: "Danh sách",
      description: "Tạo danh sách có thứ tự và không thứ tự",
      icon: <List className="h-4 w-4" />,
      markdown: `**Danh sách không thứ tự:**
- Mục 1
- Mục 2
  - Mục con 2.1
  - Mục con 2.2
- Mục 3

**Danh sách có thứ tự:**
1. Bước đầu tiên
2. Bước thứ hai
3. Bước cuối cùng`,
      preview: "Danh sách rõ ràng, dễ đọc"
    },
    {
      title: "Liên kết",
      description: "Thêm liên kết đến trang web khác",
      icon: <Link className="h-4 w-4" />,
      markdown: `[Bộ Y tế](https://moh.gov.vn)
[WHO - Tổ chức Y tế Thế giới](https://www.who.int)

Hoặc hiển thị trực tiếp: https://example.com`,
      preview: "Liên kết đến các nguồn tham khảo uy tín"
    }
  ];

  const advancedExamples: MarkdownExample[] = [
    {
      title: "Trích dẫn",
      description: "Làm nổi bật thông tin quan trọng",
      icon: <Quote className="h-4 w-4" />,
      markdown: `> **Lưu ý quan trọng:** 
> Luôn tham khảo ý kiến bác sĩ chuyên khoa trước khi 
> thay đổi phác đồ điều trị.

> "Phòng bệnh hơn chữa bệnh" - Câu nói của cha đẻ y học`,
      preview: "Thông tin nổi bật trong khung trích dẫn"
    },
    {
      title: "Mã code/Thuốc",
      description: "Hiển thị tên thuốc hoặc mã code rõ ràng",
      icon: <Code className="h-4 w-4" />,
      markdown: `Thuốc: \`Efavirenz 600mg\`

Đoạn code mẫu:
\`\`\`
CD4 Count: 350 cells/μL
Viral Load: Undetectable
Treatment: ARV combination therapy
\`\`\``,
      preview: "Tên thuốc và thông tin kỹ thuật được làm nổi bật"
    },
    {
      title: "Bảng biểu",
      description: "Tạo bảng dữ liệu có cấu trúc",
      icon: <Table className="h-4 w-4" />,
      markdown: `| Thuốc | Liều lượng | Tần suất | Ghi chú |
|-------|------------|----------|---------|
| Efavirenz | 600mg | 1 lần/ngày | Uống trước khi ngủ |
| Tenofovir | 300mg | 1 lần/ngày | Uống cùng thức ăn |
| Emtricitabine | 200mg | 1 lần/ngày | Có thể uống lúc nào |`,
      preview: "Bảng thông tin thuốc dễ theo dõi"
    },
    {
      title: "Hình ảnh",
      description: "Chèn hình ảnh minh họa",
      icon: <Image className="h-4 w-4" />,
      markdown: `![Sơ đồ miễn dịch](url-hinh-anh.jpg)

Hoặc với chú thích:
![](url-hinh-anh.jpg)
*Hình 1: Sơ đồ tác động của HIV lên hệ miễn dịch*`,
      preview: "Hình ảnh với chú thích rõ ràng"
    }
  ];

  const medicalExamples: MarkdownExample[] = [
    {
      title: "Cấu trúc bài viết y khoa",
      description: "Template hoàn chỉnh cho bài viết chuyên môn",
      icon: <BookOpen className="h-4 w-4" />,
      markdown: `# Hiểu về HIV/AIDS: Hướng dẫn toàn diện

## Tóm tắt
**HIV** (Human Immunodeficiency Virus) là virus gây suy giảm miễn dịch ở người...

## Mục lục
1. [Định nghĩa và nguyên nhân](#dinh-nghia)
2. [Triệu chứng](#trieu-chung)  
3. [Chẩn đoán](#chan-doan)
4. [Điều trị](#dieu-tri)
5. [Phòng ngừa](#phong-ngua)

## 1. Định nghĩa và nguyên nhân {#dinh-nghia}

### Định nghĩa
HIV là một loại virus thuộc họ **Retrovirus**...

### Nguyên nhân
> **Lưu ý:** HIV lây truyền chủ yếu qua 3 đường:
> - Đường tình dục
> - Đường máu  
> - Từ mẹ sang con

## 2. Triệu chứng {#trieu-chung}

### Giai đoạn cấp tính (2-4 tuần sau nhiễm)
- Sốt cao
- Đau đầu
- Phát ban da
- Sưng hạch

### Giai đoạn tiềm ẩn (có thể kéo dài nhiều năm)
- Thường không có triệu chứng
- Virus vẫn nhân lên trong cơ thể

## 3. Chẩn đoán {#chan-doan}

| Xét nghiệm | Thời gian phát hiện | Độ chính xác |
|------------|---------------------|--------------|
| Test nhanh | 3-12 tuần | 99.7% |
| ELISA | 3-12 tuần | 99.9% |
| PCR | 10-14 ngày | 99.9% |

## 4. Điều trị {#dieu-tri}

### Phác đồ ARV thường dùng:
\`\`\`
Phác đồ 1: TDF/FTC/EFV
- Tenofovir 300mg + Emtricitabine 200mg + Efavirenz 600mg
- Uống 1 viên/ngày, trước khi ngủ

Phác đồ 2: ABC/3TC/DTG  
- Abacavir 600mg + Lamivudine 300mg + Dolutegravir 50mg
- Uống 1 viên/ngày, có thể uống cùng thức ăn
\`\`\`

### Theo dõi điều trị:
- **CD4:** Kiểm tra mỗi 3-6 tháng
- **Viral Load:** Kiểm tra mỗi 3-6 tháng  
- **Mục tiêu:** Viral Load < 50 copies/mL

## 5. Phòng ngừa {#phong-ngua}

### Phòng ngừa trước phơi nhiễm (PrEP)
> **Đối tượng:** Người có nguy cơ cao nhiễm HIV
> 
> **Thuốc:** Truvada (TDF/FTC) hoặc Descovy (TAF/FTC)
> 
> **Hiệu quả:** Giảm 99% nguy cơ nhiễm HIV nếu tuân thủ đúng

### Biện pháp bảo vệ khác:
1. **Quan hệ tình dục an toàn**
   - Sử dụng bao cao su đúng cách
   - Hạn chế số lượng bạn tình
   
2. **An toàn trong y tế**
   - Sử dụng kim tiêm một lần
   - Xét nghiệm máu trước truyền

## Kết luận

HIV/AIDS là một căn bệnh có thể kiểm soát được với điều trị đúng cách...

---

**Tài liệu tham khảo:**
- [WHO HIV Guidelines](https://www.who.int/hiv)
- [CDC HIV Prevention](https://www.cdc.gov/hiv)
- Bộ Y tế Việt Nam - Hướng dẫn chẩn đoán và điều trị HIV/AIDS

**Tác giả:** BS. Nguyễn Văn A - Khoa Nhiễm, Bệnh viện ABC

**Ngày cập nhật:** ${new Date().toLocaleDateString('vi-VN')}`,
      preview: "Bài viết y khoa hoàn chỉnh với cấu trúc rõ ràng"
    }
  ];

  const tips = [
    "Sử dụng tiêu đề để tạo cấu trúc rõ ràng cho bài viết",
    "In đậm từ khóa quan trọng để người đọc dễ nắm bắt",
    "Dùng danh sách để trình bày thông tin một cách có tổ chức",
    "Thêm liên kết đến các nguồn tham khảo uy tín",
    "Sử dụng bảng để trình bày dữ liệu so sánh",
    "Tận dụng trích dẫn để làm nổi bật thông tin quan trọng",
    "Thêm hình ảnh minh họa để bài viết sinh động hơn",
    "Luôn kiểm tra lại định dạng trước khi đăng bài"
  ];

  return (
    <>
      <Button variant="outline" className="flex items-center gap-2" onClick={() => setIsOpen(true)}>
        <BookOpen className="h-4 w-4" />
        Hướng dẫn Markdown
      </Button>

      <BasicModal open={isOpen} onClose={() => setIsOpen(false)} maxWidth="max-w-7xl">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Hướng dẫn viết bài với Markdown</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Học cách sử dụng Markdown để tạo ra những bài viết y khoa đẹp và chuyên nghiệp
          </p>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Cơ bản</TabsTrigger>
            <TabsTrigger value="advanced">Nâng cao</TabsTrigger>
            <TabsTrigger value="medical">Y khoa</TabsTrigger>
            <TabsTrigger value="tips">Mẹo hay</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <div className="grid gap-4">
              {basicExamples.map((example, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {example.icon}
                      {example.title}
                    </CardTitle>
                    <CardDescription>{example.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">Markdown</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(example.markdown, index)}
                          className="flex items-center gap-1"
                        >
                          {copiedIndex === index ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                          {copiedIndex === index ? "Đã sao chép" : "Sao chép"}
                        </Button>
                      </div>
                      <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                        <code>{example.markdown}</code>
                      </pre>
                    </div>
                    <div>
                      <Badge variant="secondary">Kết quả</Badge>
                      <p className="text-sm text-gray-600 mt-1">{example.preview}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4">
            <div className="grid gap-4">
              {advancedExamples.map((example, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {example.icon}
                      {example.title}
                    </CardTitle>
                    <CardDescription>{example.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">Markdown</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(example.markdown, index + 100)}
                          className="flex items-center gap-1"
                        >
                          {copiedIndex === index + 100 ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                          {copiedIndex === index + 100 ? "Đã sao chép" : "Sao chép"}
                        </Button>
                      </div>
                      <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                        <code>{example.markdown}</code>
                      </pre>
                    </div>
                    <div>
                      <Badge variant="secondary">Kết quả</Badge>
                      <p className="text-sm text-gray-600 mt-1">{example.preview}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="medical" className="space-y-4">
            <div className="grid gap-4">
              {medicalExamples.map((example, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      {example.icon}
                      {example.title}
                    </CardTitle>
                    <CardDescription>{example.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">Template hoàn chỉnh</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(example.markdown, index + 200)}
                          className="flex items-center gap-1"
                        >
                          {copiedIndex === index + 200 ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                          {copiedIndex === index + 200 ? "Đã sao chép" : "Sao chép"}
                        </Button>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        <pre className="bg-gray-100 p-3 rounded text-xs">
                          <code>{example.markdown}</code>
                        </pre>
                      </div>
                    </div>
                    <div>
                      <Badge variant="secondary">Mô tả</Badge>
                      <p className="text-sm text-gray-600 mt-1">{example.preview}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tips" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>💡 Mẹo viết bài hiệu quả</CardTitle>
                <CardDescription>
                  Những lời khuyên giúp bạn tạo ra những bài viết y khoa chất lượng
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <Badge variant="secondary" className="mt-0.5">
                        {index + 1}
                      </Badge>
                      <p className="text-sm">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📋 Checklist trước khi đăng bài</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    "Kiểm tra chính tả và ngữ pháp",
                    "Đảm bảo các liên kết hoạt động đúng",
                    "Thêm alt text cho hình ảnh",
                    "Kiểm tra định dạng bảng và danh sách",
                    "Xác minh thông tin y khoa chính xác",
                    "Thêm nguồn tham khảo đáng tin cậy",
                    "Đọc lại một lần nữa từ góc nhìn người đọc"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button 
            variant="secondary" 
            onClick={() => window.open('/docs/MARKDOWN_GUIDE.md', '_blank')}
          >
            📖 Xem hướng dẫn đầy đủ
          </Button>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Đóng
          </Button>
        </div>
        </div>
      </BasicModal>
    </>
  );
};

export default MarkdownGuide;
