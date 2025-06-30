import type { Comment } from "@/types/anonymousPost.type";
import { CommentItem } from "./comment-item";

interface CommentListProps {
  comments: Comment[];
}

export function CommentList({ comments }: CommentListProps) {
  return (
    <div className="mt-4 space-y-3  pt-4">
      {comments.map((comment) => (
        <CommentItem key={comment.commentId} comment={comment} />
      ))}
    </div>
  );
}
