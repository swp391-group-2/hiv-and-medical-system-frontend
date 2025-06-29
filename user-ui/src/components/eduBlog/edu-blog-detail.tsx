import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { User, Hash } from "lucide-react";

interface BlogData {
  blogId: number;
  author: string;
  title: string;
  snippet: string;
  content: string;
  image: string;
}

interface BlogPostProps {
  data: BlogData;
}

export default function EduBlogDetail({ data }: BlogPostProps) {
  const { blogId, author, title, snippet, content, image } = data;

  // Format content paragraphs
  const formatContent = (text: string) => {
    return text.split("\n\n").map((paragraph, index) => {
      if (paragraph.startsWith("## ")) {
        return (
          <h2
            key={index}
            className="text-2xl font-bold text-gray-800 mt-8 mb-4 border-l-4 border-blue-500 pl-4"
          >
            {paragraph.replace("## ", "")}
          </h2>
        );
      }

      if (paragraph.includes("npx create-next-app")) {
        return (
          <div
            key={index}
            className="bg-gray-900 text-green-400 p-4 rounded-lg my-6 font-mono text-sm"
          >
            {paragraph.split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        );
      }

      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
          {paragraph}
        </p>
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-0">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-t-lg">
            <div className="flex items-center gap-3 mb-4">
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-0"
              >
                <Hash className="w-3 h-3 mr-1" />
                {blogId}
              </Badge>
            </div>

            <h1 className="text-4xl font-bold mb-4 leading-tight">{title}</h1>

            <p className="text-blue-100 text-xl leading-relaxed mb-6">
              {snippet}
            </p>

            <div className="flex items-center gap-2 text-blue-100">
              <User className="w-4 h-4" />
              <span className="font-medium">{author}</span>
            </div>
          </div>

          {/* Image Section */}
          {image && (
            <div className="px-8 py-4">
              <img
                src={image}
                alt={title}
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Content Section */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none">
              {formatContent(content)}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
