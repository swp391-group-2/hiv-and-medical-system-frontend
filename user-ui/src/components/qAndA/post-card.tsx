import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MessageCircle, Share2 } from "lucide-react";

import type { AnonymousPost } from "@/types/anonymousPost.type";
import { CommentList } from "./comment-list";
import { getTimeAgo } from "@/utils/utils";
import { useProfileStore } from "@/stores/profile.store";

export interface PostCardProps {
  post: AnonymousPost;
  showComments: boolean;
  onToggleComments: (postId: string) => void;
}

export default function PostCard({
  post,
  showComments,
  onToggleComments,
}: PostCardProps) {
  const getAvatarFallback = (nickName: string) => {
    return nickName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const user = useProfileStore((state) => state.profile);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-sky-600 text-white font-medium">
              {getAvatarFallback("Anonymous User")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                {post.patientId == user?.patientId
                  ? "Bạn"
                  : "Người dùng ẩn danh"}
              </h3>
            </div>
            <p className="text-xs text-muted-foreground">
              {getTimeAgo(new Date(post.createdAt))}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <h4 className="font-medium text-xl ">{post.title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {post.content}
          </p>

          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1"
                onClick={() => onToggleComments("" + post.anonymousPostId)}
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs">{post.comments.length}</span>
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {showComments && (
            <div className="mt-4 space-y-3  animate-in slide-in-from-top-2 duration-300">
              {post.comments.length > 0 ? (
                <CommentList comments={post.comments} />
              ) : (
                <p className="text-sm text-muted-foreground">
                  Chưa có bình luận nào.
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
