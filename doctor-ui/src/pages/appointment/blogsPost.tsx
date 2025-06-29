import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { blogAPI } from "@/api/blogAPI";
import type { CreateBlogRequest, BlogResponse } from "@/api/blogAPI";
import { Loader2, Plus, Eye, Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface BlogFormData {
  title: string;
  content: string;
  snippet: string;
  author: string;
  urlImage?: string; // URL hình ảnh sau khi upload
  selectedFile?: File; // File được chọn để upload
}

const BlogsPost = () => {
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    content: "",
    snippet: "",
    author: "",
    urlImage: "",
    selectedFile: undefined,
  });

  const [blogs, setBlogs] = useState<BlogResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogResponse | null>(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Lấy thông tin author từ localStorage hoặc token
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));

        // Thử các key có thể chứa tên bác sĩ
        const doctorName =
          payload.name ||
          payload.doctorName ||
          payload.fullName ||
          payload.username ||
          "Bác sĩ";
        setFormData((prev) => ({ ...prev, author: doctorName }));
      } catch {
        setFormData((prev) => ({ ...prev, author: "Bác sĩ" }));
      }
    }
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      setIsLoadingBlogs(true);
      const blogsList = await blogAPI.getAllBlogs();

      // Đảm bảo blogsList là array
      if (Array.isArray(blogsList)) {
        setBlogs(blogsList);
      } else {
        setBlogs([]);
      }
    } catch {
      toast.error("Không thể tải danh sách bài viết");
      setBlogs([]); // Set empty array in case of error
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  const handleInputChange = (field: keyof BlogFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Sanitize title để tránh vấn đề encoding
  const sanitizeTitle = (title: string): string => {
    return title
      .trim()
      .replace(/[^\x20-\x7E\u00A0-\uFFFF]/g, "") // Only allow printable characters
      .slice(0, 255); // Limit length
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      toast.error("Vui lòng nhập tiêu đề bài viết");
      return false;
    }
    if (!formData.content.trim()) {
      toast.error("Vui lòng nhập nội dung bài viết");
      return false;
    }
    if (!formData.snippet.trim()) {
      toast.error("Vui lòng nhập mô tả ngắn");
      return false;
    }
    if (!formData.author.trim()) {
      toast.error("Vui lòng nhập tên tác giả");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);

      const blogData: CreateBlogRequest = {
        title: sanitizeTitle(formData.title),
        content: formData.content.trim(),
        snippet: formData.snippet.trim(),
        author: formData.author.trim(),
        file: formData.selectedFile, // Gửi file trực tiếp
      };

      if (isEditMode && selectedBlog) {
        // Sử dụng blogId thay vì id
        const blogId = selectedBlog.blogId;

        if (!blogId) {
          throw new Error("Blog ID is missing");
        }

        await blogAPI.updateBlog(blogId, blogData);
        toast.success("Cập nhật bài viết thành công!");
      } else {
        await blogAPI.createBlog(blogData);
        toast.success("Đăng bài viết thành công!");
      }

      // Reset form
      setFormData({
        title: "",
        content: "",
        snippet: "",
        author: formData.author, // Giữ lại tên tác giả
        urlImage: "",
        selectedFile: undefined,
      });
      setImagePreview("");

      // Đóng dialog trước
      setIsDialogOpen(false);

      // Delay một chút trước khi reload để đảm bảo API update hoàn tất
      setTimeout(async () => {
        await loadBlogs();
      }, 500);
    } catch (error) {
      const errorMessage = isEditMode
        ? "Có lỗi xảy ra khi cập nhật bài viết"
        : "Có lỗi xảy ra khi đăng bài viết";
      toast.error(error instanceof Error ? error.message : errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const openCreateDialog = () => {
    setSelectedBlog(null);
    setIsViewMode(false);
    setIsEditMode(false);
    setFormData({
      title: "",
      content: "",
      snippet: "",
      author: formData.author,
      urlImage: "",
      selectedFile: undefined,
    });
    setImagePreview("");
    setIsDialogOpen(true);
  };

  const openEditDialog = (blog: BlogResponse) => {
    setSelectedBlog(blog);
    setIsViewMode(false);
    setIsEditMode(true);
    setFormData({
      title: blog.title,
      content: blog.content,
      snippet: blog.snippet,
      author: blog.author,
      urlImage: blog.urlImage || "",
      selectedFile: undefined,
    });
    // Set image preview nếu có
    if (blog.urlImage) {
      setImagePreview(blog.urlImage);
    } else {
      setImagePreview("");
    }
    setIsDialogOpen(true);
  };

  const openViewDialog = (blog: BlogResponse) => {
    setSelectedBlog(blog);
    setIsViewMode(true);
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle file upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn file hình ảnh!");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Kích thước file không được vượt quá 5MB!");
      return;
    }

    setIsUploadingImage(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Lưu file vào state để gửi kèm request tạo/cập nhật blog
      setFormData((prev) => ({
        ...prev,
        selectedFile: file,
      }));

      if (isEditMode) {
        toast.success(
          "Đã chọn ảnh mới! Nhấn 'Cập nhật bài viết' để thay đổi ảnh."
        );
      } else {
        toast.success("Chọn hình ảnh thành công!");
      }
    } catch {
      toast.error("Có lỗi khi xử lý hình ảnh!");
      setImagePreview("");
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Remove uploaded image
  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      urlImage: "",
      selectedFile: undefined,
    }));
    setImagePreview("");
    // Reset input file
    const fileInput = document.getElementById(
      "image-upload"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }

    if (isEditMode) {
      toast.success("Đã xóa ảnh! Nhấn 'Cập nhật bài viết' để lưu thay đổi.");
    } else {
      toast.success("Đã xóa hình ảnh!");
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý bài viết</h1>
          <p className="text-gray-600 mt-2">
            Tạo và quản lý các bài viết chia sẻ kiến thức y tế
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={openCreateDialog}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Tạo bài viết mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isViewMode
                  ? "Chi tiết bài viết"
                  : isEditMode
                  ? "Chỉnh sửa bài viết"
                  : "Tạo bài viết mới"}
              </DialogTitle>
              <DialogDescription>
                {isViewMode
                  ? "Xem chi tiết bài viết đã đăng"
                  : isEditMode
                  ? "Chỉnh sửa thông tin bài viết"
                  : "Điền thông tin để tạo bài viết chia sẻ kiến thức y tế"}
              </DialogDescription>
            </DialogHeader>

            {isViewMode && selectedBlog ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedBlog.title}
                  </h2>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>Tác giả: {selectedBlog.author}</span>
                    <span>•</span>
                    <span>{formatDate(selectedBlog.createdAt)}</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-semibold text-gray-700">
                    Mô tả ngắn:
                  </Label>
                  <p className="mt-1 text-gray-600 italic">
                    {selectedBlog.snippet}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-semibold text-gray-700">
                    Nội dung:
                  </Label>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                    <div className="prose max-w-none">
                      {selectedBlog.content
                        .split("\n")
                        .map((paragraph, index) => (
                          <p key={index} className="mb-4 last:mb-0">
                            {paragraph}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Đóng
                  </Button>
                  <Button
                    type="button"
                    onClick={() => openEditDialog(selectedBlog)}
                    className="flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Chỉnh sửa
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="author">Tác giả *</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) =>
                        handleInputChange("author", e.target.value)
                      }
                      placeholder="Nhập tên tác giả"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="title">Tiêu đề bài viết *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      placeholder="Nhập tiêu đề bài viết"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="snippet">Mô tả ngắn *</Label>
                    <Textarea
                      id="snippet"
                      value={formData.snippet}
                      onChange={(e) =>
                        handleInputChange("snippet", e.target.value)
                      }
                      placeholder="Nhập mô tả ngắn về bài viết (1-2 câu)"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Nội dung bài viết *</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) =>
                        handleInputChange("content", e.target.value)
                      }
                      placeholder="Nhập nội dung đầy đủ của bài viết..."
                      rows={12}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="image-upload" className="flex items-center">
                      Hình ảnh minh họa:
                      <span className="text-xs text-gray-500 ml-1">
                        (
                        {isEditMode
                          ? "Chọn ảnh mới để thay đổi, hoặc giữ nguyên ảnh cũ. "
                          : ""}
                        Kéo thả hoặc nhấn để tải lên, tối đa 5MB)
                      </span>
                    </Label>
                    <div className="flex items-center gap-4 mt-2">
                      {imagePreview || formData.urlImage ? (
                        <div className="relative">
                          <img
                            src={imagePreview || formData.urlImage}
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            onClick={handleRemoveImage}
                            className="absolute top-0 right-0 rounded-full p-1 bg-white shadow-md"
                            variant="outline"
                            size="sm"
                          >
                            &times;
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          className="flex items-center gap-2"
                          asChild
                          disabled={isUploadingImage}
                        >
                          <label
                            htmlFor="image-upload"
                            className="cursor-pointer"
                          >
                            {isUploadingImage ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Đang tải lên...
                              </>
                            ) : (
                              <>
                                <Plus className="h-4 w-4" />
                                Tải lên hình ảnh
                              </>
                            )}
                          </label>
                        </Button>
                      )}
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={isUploadingImage}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Hủy
                  </Button>
                  <Button
                    type="submit"
                    disabled={isLoading || isUploadingImage}
                  >
                    {isLoading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isLoading
                      ? formData.selectedFile
                        ? "Đang đăng bài viết với hình ảnh..."
                        : "Đang đăng bài viết..."
                      : isEditMode
                      ? "Cập nhật bài viết"
                      : "Đăng bài viết"}
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Danh sách bài viết */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Bài viết đã đăng
        </h2>

        {isLoadingBlogs ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Đang tải danh sách bài viết...</span>
          </div>
        ) : blogs.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <p className="text-gray-500 mb-4">
                Chưa có bài viết nào được đăng
              </p>
              <Button onClick={openCreateDialog} variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Tạo bài viết đầu tiên
              </Button>
            </CardContent>
          </Card>
        ) : Array.isArray(blogs) && blogs.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Card
                key={blog.blogId}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                  <CardDescription className="text-sm">
                    Bởi {blog.author} • {formatDate(blog.createdAt)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {blog.urlImage && (
                    <div className="mb-4">
                      <img
                        src={blog.urlImage}
                        alt={blog.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <p className="text-gray-600 line-clamp-3 mb-4">
                    {blog.snippet}
                  </p>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary">Bài viết</Badge>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(blog)}
                        className="flex items-center gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        Sửa
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openViewDialog(blog)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        Xem
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <p className="text-gray-500">
                Có lỗi xảy ra khi tải danh sách bài viết
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BlogsPost;
