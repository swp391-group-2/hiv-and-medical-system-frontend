import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export const postSchema = z.object({
  nickName: z
    .string()
    .min(2, "Biệt danh phải có ít nhất 2 ký tự")
    .max(50, "Biệt danh phải có ít hơn 50 ký tự"),
  gender: z.enum(["Nam", "Nữ", "Khác"], {
    required_error: "Hãy chọn giới tính của bạn",
  }),
  age: z
    .number()
    .min(1, "Tuổi phải lớn hơn 0")
    .max(120, "Tuổi phải nhỏ hơn 120"),
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

interface PostFormProps {
  onSubmit: (post: PostFormData) => void;
}

export function PostForm({ onSubmit }: PostFormProps) {
  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      nickName: "",
      gender: undefined,
      age: 18,
      title: "",
      content: "",
    },
  });

  const handleSubmit = async (data: PostFormData) => {
    onSubmit(data);
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
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className=" gap-4">
              <FormField
                control={form.control}
                name="nickName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biệt Danh</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập biệt danh của bạn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Giới tính</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Nam</SelectItem>
                        <SelectItem value="female">Nữ</SelectItem>
                        <SelectItem value="other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tuổi</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter your age"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
