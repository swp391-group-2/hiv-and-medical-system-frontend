import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, User, Calendar } from "lucide-react";
import type { AnonymousPost, Comment } from "@/types/qaType";
import { replyToAnonymousPost } from "@/api/doctorAnDanhQA";
import { toast } from "sonner";

interface AnonymousPostCardProps {
  post: AnonymousPost;
  onReplySuccess?: () => void;
}

const AnonymousPostCard = ({
  post,
  onReplySuccess,
}: AnonymousPostCardProps) => {
  const [replyContent, setReplyContent] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReply = async () => {
    if (!replyContent.trim()) {
      toast.error("Vui lòng nhập nội dung trả lời");
      return;
    }

    setIsSubmitting(true);
    try {
      await replyToAnonymousPost(post.anonymousPostId, replyContent.trim());
      toast.success("Trả lời thành công!");
      setReplyContent("");
      setShowReplyForm(false);
      onReplySuccess?.();
    } catch (error) {
      console.error("Error replying to post:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Có lỗi xảy ra khi trả lời";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-gray-900">
            {post.title}
          </CardTitle>
          <Badge variant="outline" className="ml-2">
            {post.gender}
          </Badge>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <User className="w-4 h-4" />
          <span>{post.nickName}</span>
          <Calendar className="w-4 h-4 ml-2" />
          <span>{formatDate(post.createdAt)}</span>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

        {/* Comments section */}
        {post.comments && post.comments.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Phản hồi từ bác sĩ ({post.comments.length})
            </h4>

            <div className="space-y-3">
              {post.comments.map((comment: Comment) => (
                <div
                  key={comment.commentId}
                  className="bg-blue-50 p-3 rounded-lg"
                >
                  <p className="text-gray-800 mb-2">{comment.content}</p>
                  <div className="text-xs text-gray-500">
                    Bác sĩ • {formatDate(comment.createdAt)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reply form */}
        <div className="border-t pt-4 mt-4">
          {!showReplyForm ? (
            <Button
              variant="outline"
              onClick={() => setShowReplyForm(true)}
              className="w-full"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Trả lời bệnh nhân
            </Button>
          ) : (
            <div className="space-y-3">
              <Textarea
                placeholder="Nhập câu trả lời của bạn..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={4}
                className="w-full"
              />

              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowReplyForm(false);
                    setReplyContent("");
                  }}
                  disabled={isSubmitting}
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleReply}
                  disabled={isSubmitting || !replyContent.trim()}
                >
                  {isSubmitting ? (
                    "Đang gửi..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Gửi trả lời
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnonymousPostCard;
