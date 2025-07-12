import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Send } from "lucide-react";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { anonymousPostApi } from "@/apis/anonymousPost.api";
import { toast } from "sonner";

const postSchema = z.object({
  title: z
    .string()
    .min(5, "Tiêu đề phải có ít nhất 5 ký tự")
    .max(100, "Tiêu đề phải có ít hơn 100 ký tự"),
  content: z
    .string()
    .min(10, "Nội dung phải có ít nhất 10 ký tự")
    .max(1000, "Nội dung phải có ít hơn 1000 ký tự"),
});
export type PostFormData = z.infer<typeof postSchema>;

export function PostForm() {
  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (value: PostFormData) => {
      await anonymousPostApi.postAnonymousPost(value);
    },
    onSuccess: () => {
      toast.success("Câu hỏi đã được gửi thành công!", {
        description: "Cảm ơn bạn đã chia sẻ câu hỏi của mình.",
      });
      form.reset();
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (error) => {
      toast.error("Đã xảy ra lỗi khi gửi câu hỏi", {
        description:
          error instanceof Error ? error.message : "Vui lòng thử lại sau.",
      });
    },
  });

  const handleSubmit = async (data: PostFormData) => {
    mutate(data);
    console.log("Submitting post:", data);
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-3xl font-bold text-center">Tạo Câu Hỏi Tư Vấn</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((value) => handleSubmit(value))}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu Đề</FormLabel>
                  <FormControl>
                    <Input placeholder="Bạn đang nghĩ gì?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội Dung</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Chia sẻ suy nghĩ của bạn..."
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              <Send className="w-4 h-4 mr-2" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
