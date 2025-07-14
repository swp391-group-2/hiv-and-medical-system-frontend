import React, { useState, useEffect, useCallback } from "react";
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
import { blogAPI, type DoctorInfo } from "@/api/blogAPI";
import type { CreateBlogRequest, BlogResponse } from "@/api/blogAPI";
import { Loader2, Plus, Eye, Edit } from "lucide-react";
import BasicModal from "@/components/Modal/basicModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { fetchCurrentDoctorInfo } from "@/api/doctorSchedule";
import MarkdownGuide from "@/components/MarkdownGuide";
import QuickMarkdownHelp from "@/components/QuickMarkdownHelp";
import MarkdownRenderer from "@/components/MarkdownRenderer";

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

  // State để lưu doctorId và doctor info
  const [doctorId, setDoctorId] = useState<string>("");
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo | null>(null);

  const loadBlogs = useCallback(
    async (doctorIdParam?: string) => {
      try {
        setIsLoadingBlogs(true);

        const currentDoctorId = doctorIdParam || doctorId;

        console.log("=== LOAD BLOGS DEBUG ===");
        console.log("doctorIdParam:", doctorIdParam);
        console.log("doctorId from state:", doctorId);
        console.log("currentDoctorId:", currentDoctorId);
        console.log("========================");

        let blogsList: BlogResponse[] = [];

        if (currentDoctorId) {
          console.log("Loading blogs for doctorId:", currentDoctorId);
          // Sử dụng getBlogsByDoctorId để chỉ lấy blog của bác sĩ hiện tại
          blogsList = await blogAPI.getBlogsByDoctorId(currentDoctorId);
        } else {
          console.log("No doctorId available, loading all blogs");
          // Fallback: nếu không có doctorId, load tất cả blogs
          blogsList = await blogAPI.getAllBlogs();
        }

        console.log("Loaded blogs:", blogsList);

        // Đảm bảo blogsList là array
        if (Array.isArray(blogsList)) {
          setBlogs(blogsList);
        } else {
          setBlogs([]);
        }
      } catch (error) {
        console.error("Error loading blogs:", error);
        toast.error("Không thể tải danh sách bài viết");
        setBlogs([]); // Set empty array in case of error
      } finally {
        setIsLoadingBlogs(false);
      }
    },
    [doctorId]
  );

  // Lấy thông tin bác sĩ từ API
  useEffect(() => {
    const loadDoctorInfo = async () => {
      try {
        const info = await fetchCurrentDoctorInfo();
        console.log("Doctor info loaded:", info);
        console.log("=== DOCTOR INFO DEBUG ===");
        console.log("info.id (doctorId):", info.doctorId);
        console.log("info.userId:", info.userId);
        console.log("info.fullName:", info.fullName);
        console.log("========================");

        setDoctorInfo(info);
        // Ưu tiên lấy id (đã là doctorId) thay vì userId
        setDoctorId(info.doctorId || "");

        // Console log doctorId sau khi set
        console.log("DoctorId set to state:", info.doctorId || "");

        // Sử dụng fullName từ API làm tên tác giả
        const authorName = info.fullName || info.email || "Bác sĩ";
        setFormData((prev) => ({ ...prev, author: authorName }));

        // Load blogs với doctorId (info.id chính là doctorId)
        if (info.doctorId) {
          loadBlogs(info.doctorId);
        }
      } catch (error) {
        console.error("Error loading doctor info:", error);

        // Fallback: thử lấy từ token như trước
        const token = localStorage.getItem("accessToken");
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            console.log("=== TOKEN PAYLOAD DEBUG ===");
            console.log("Full payload:", payload);
            console.log("payload.doctorId:", payload.doctorId);
            console.log("payload.id:", payload.id);
            console.log("payload.sub:", payload.sub);
            console.log("payload.userId:", payload.userId);

            // Lấy doctorId từ token (ưu tiên doctorId)
            const doctorIdFromToken =
              payload.doctorId || payload.id || payload.sub;
            console.log("Selected doctorId:", doctorIdFromToken);
            setDoctorId(doctorIdFromToken);

            // Thử các key có thể chứa tên bác sĩ
            const doctorName =
              payload.name ||
              payload.doctorName ||
              payload.fullName ||
              payload.username ||
              "Bác sĩ";
            setFormData((prev) => ({ ...prev, author: doctorName }));

            // Load blogs với doctorId từ token
            if (doctorIdFromToken) {
              loadBlogs(doctorIdFromToken);
            }
          } catch (tokenError) {
            console.error("Error parsing token:", tokenError);
            setFormData((prev) => ({ ...prev, author: "Bác sĩ" }));

            loadBlogs();
          }
        }
      }
    };

    loadDoctorInfo();
  }, [loadBlogs]);

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

      console.log("=== BLOG SUBMIT DEBUG ===");
      console.log("Current doctorId in state:", doctorId);
      console.log("Form data being submitted:", formData);
      console.log("========================");

      const blogData: CreateBlogRequest = {
        title: sanitizeTitle(formData.title),
        content: formData.content.trim(),
        snippet: formData.snippet.trim(),
        author: formData.author.trim(),
        doctorId: doctorId, // Thêm doctorId từ state
        file: formData.selectedFile, // Gửi file trực tiếp
      };

      console.log("Blog data with doctorId:", blogData);

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
        console.log("Reloading blogs after submit with doctorId:", doctorId);
        await loadBlogs(doctorId);
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
    <div className="container mx-auto p-6 space-y-6 ">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý bài viết</h1>
          <p className="text-gray-600 mt-2">
            Tạo và quản lý các bài viết chia sẻ kiến thức y tế
          </p>
          {doctorInfo && (
            <p className="text-sm text-gray-500 mt-1">
              Đăng nhập với tư cách: {doctorInfo.fullName} (
              {doctorInfo.specialization})
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <MarkdownGuide />
          <Button
            onClick={openCreateDialog}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Tạo bài viết mới
          </Button>
        </div>

        <BasicModal
          open={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          maxWidth="max-w-5xl"
        >
          <div className="space-y-4">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">
                {isViewMode
                  ? "Chi tiết bài viết"
                  : isEditMode
                  ? "Chỉnh sửa bài viết"
                  : "Tạo bài viết mới"}
              </h2>
              <p className="text-gray-600 mt-1">
                {isViewMode
                  ? "Xem chi tiết bài viết đã đăng"
                  : isEditMode
                  ? "Chỉnh sửa thông tin bài viết"
                  : "Điền thông tin để tạo bài viết chia sẻ kiến thức y tế"}
              </p>
            </div>

            {isViewMode && selectedBlog ? (
              <div className="space-y-6">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    <MarkdownRenderer
                      content={selectedBlog.title}
                      className="text-2xl font-bold"
                    />
                  </div>
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
                  <div className="mt-1">
                    <MarkdownRenderer
                      content={selectedBlog.snippet}
                      className="text-gray-600 italic text-sm"
                    />
                  </div>
                </div>

                {selectedBlog.urlImage && (
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">
                      Hình ảnh minh họa:
                    </Label>
                    <div className="mt-2">
                      <img
                        src={selectedBlog.urlImage}
                        alt={selectedBlog.title}
                        className="w-full max-w-full max-h-96 object-contain rounded-lg border shadow-sm"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-sm font-semibold text-gray-700">
                    Nội dung:
                  </Label>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                    <MarkdownRenderer
                      content={selectedBlog.content}
                      className="text-gray-800"
                    />
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
              <Tabs defaultValue="edit" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="edit" className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    {isEditMode ? "Chỉnh sửa" : "Viết bài"}
                  </TabsTrigger>
                  <TabsTrigger
                    value="preview"
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Xem trước
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="edit">
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
                        <QuickMarkdownHelp />
                        <Textarea
                          id="content"
                          value={formData.content}
                          onChange={(e) =>
                            handleInputChange("content", e.target.value)
                          }
                          placeholder="Nhập nội dung đầy đủ của bài viết... Sử dụng Markdown để định dạng văn bản đẹp hơn!"
                          rows={12}
                          required
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="image-upload"
                          className="flex items-center"
                        >
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
                </TabsContent>

                <TabsContent value="preview">
                  <div className="space-y-6">
                    <div className="border rounded-lg p-4 bg-gray-50">
                      <h3 className="text-lg font-semibold mb-3">
                        Xem trước bài viết
                      </h3>

                      {formData.title && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-600 mb-1">
                            Tiêu đề:
                          </h4>
                          <MarkdownRenderer
                            content={formData.title}
                            className="text-xl font-bold"
                          />
                        </div>
                      )}

                      {formData.author && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-600">
                            Tác giả: {formData.author}
                          </p>
                        </div>
                      )}

                      {formData.snippet && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-600 mb-1">
                            Mô tả ngắn:
                          </h4>
                          <MarkdownRenderer
                            content={formData.snippet}
                            className="text-gray-600 italic"
                          />
                        </div>
                      )}

                      {(imagePreview || formData.urlImage) && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-600 mb-1">
                            Hình ảnh:
                          </h4>
                          <img
                            src={imagePreview || formData.urlImage}
                            alt="Preview"
                            className="w-full max-w-md h-auto rounded-lg border"
                          />
                        </div>
                      )}

                      {formData.content && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-600 mb-2">
                            Nội dung:
                          </h4>
                          <div className="bg-white p-4 rounded border">
                            <MarkdownRenderer
                              content={formData.content}
                              className="text-gray-800"
                            />
                          </div>
                        </div>
                      )}

                      {!formData.title &&
                        !formData.content &&
                        !formData.snippet && (
                          <p className="text-gray-500 text-center py-8">
                            Nhập nội dung ở tab "Viết bài" để xem preview
                          </p>
                        )}
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
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          const fakeEvent = {
                            preventDefault: () => {},
                          } as React.FormEvent;
                          handleSubmit(fakeEvent);
                        }}
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
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </BasicModal>
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
                  <CardTitle className="line-clamp-2">
                    <MarkdownRenderer
                      content={blog.title}
                      className="text-lg font-semibold"
                    />
                  </CardTitle>
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
                  <div className="text-gray-600 line-clamp-3 mb-4">
                    <MarkdownRenderer
                      content={blog.snippet}
                      className="text-sm"
                    />
                  </div>
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
