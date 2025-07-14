import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Send, User, Calendar, Stethoscope } from "lucide-react";
import type { AnonymousPost, Comment, Doctor } from "@/types/qaType";
import { replyToAnonymousPost, getDoctorById } from "@/api/doctorAnDanhQA";
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
  const [doctorInfo, setDoctorInfo] = useState<Record<string, Doctor>>({});

  // Fetch doctor info for comments
  useEffect(() => {
    const fetchDoctorsInfo = async () => {
      if (!post.comments || post.comments.length === 0) return;

      try {
        const doctorIds = post.comments
          .map((comment) => comment.doctorId)
          .filter((id, index, arr) => id && arr.indexOf(id) === index); // Remove duplicates and null/undefined

        const doctorPromises = doctorIds.map(async (doctorId) => {
          // Additional check to ensure doctorId is valid
          if (!doctorId || doctorId === "null" || doctorId === "undefined") {
            console.warn(`Invalid doctorId: ${doctorId}`);
            return { doctorId, doctor: null };
          }

          try {
            const doctor = await getDoctorById(doctorId);
            return { doctorId, doctor };
          } catch (error) {
            console.error(`Error fetching doctor ${doctorId}:`, error);
            return { doctorId, doctor: null };
          }
        });

        const results = await Promise.all(doctorPromises);
        const doctorMap: Record<string, Doctor> = {};

        results.forEach(({ doctorId, doctor }) => {
          if (doctor) {
            doctorMap[doctorId] = doctor;
          }
        });

        setDoctorInfo(doctorMap);
      } catch (error) {
        console.error("Error fetching doctors info:", error);
      }
    };

    fetchDoctorsInfo();
  }, [post.comments]);

  const handleReply = async () => {
    if (!replyContent.trim()) {
      toast.error("Vui lòng nhập nội dung trả lời");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await replyToAnonymousPost(
        post.anonymousPostId,
        replyContent.trim()
      );
      console.log("Reply response:", response);
      toast.success("Trả lời thành công!");
      setReplyContent("");
      setShowReplyForm(false);

      // Call the callback to refresh data
      if (onReplySuccess) {
        console.log("Calling onReplySuccess to refresh data...");
        onReplySuccess();
      }
    } catch (error) {
      console.error("Reply error:", error);
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
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <User className="w-4 h-4" />
          <span>Người dùng ẩn danh</span>
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
              {post.comments.map((comment: Comment) => {
                const doctor = doctorInfo[comment.doctorId];
                const doctorName = doctor?.fullName || comment.doctorName;
                const doctorImage =
                  doctor?.profilePicture || comment.doctorImageUrl;

                return (
                  <div
                    key={comment.commentId}
                    className="bg-blue-50 p-4 rounded-lg"
                  >
                    {/* Doctor info header */}
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={doctorImage || undefined}
                          alt={doctorName || "Bệnh nhân ẩn danh"}
                        />
                        <AvatarFallback
                          className={
                            doctorName
                              ? "bg-blue-500 text-white"
                              : "bg-gray-500 text-white"
                          }
                        >
                          {doctorName ? (
                            <Stethoscope className="w-4 h-4" />
                          ) : (
                            <User className="w-4 h-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-medium ${
                              doctorName ? "text-blue-900" : "text-gray-700"
                            }`}
                          >
                            {doctorName
                              ? `Bác sĩ ${doctorName}`
                              : "Bệnh nhân ẩn danh"}
                          </span>
                          {/* <Badge variant="secondary" className="text-xs">
                            {doctor?.specialization || "Bác sĩ"}
                          </Badge> */}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatDate(comment.createdAt)}
                        </div>
                      </div>
                    </div>

                    {/* Comment content */}
                    <p className="text-gray-800 leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                );
              })}
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
