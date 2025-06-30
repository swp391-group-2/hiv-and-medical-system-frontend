import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Comment } from "@/types/anonymousPost.type";
import { getTimeAgo } from "@/utils/utils";

interface CommentItemProps {
  comment: Comment;
}

export function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="flex space-x-3">
      <Avatar className="h-8 w-8">
        <AvatarImage
          src={
            comment.doctorImageUrl
              ? comment.doctorImageUrl
              : "/placeholder.svg?height=32&width=32"
          }
        />
        <AvatarFallback className="text-xs">
          {comment.doctorId
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium text-sm">
              {"Dr. " + "Nguyễn Hoài Phương"}
            </span>
            <span className="text-xs text-muted-foreground">
              {getTimeAgo(new Date(comment.createdAt))}
            </span>
          </div>
          <p className="text-sm">{comment.content}</p>
        </div>
      </div>
    </div>
  );
}
