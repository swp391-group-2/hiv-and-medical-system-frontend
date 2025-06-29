import { BASE_URL } from "./BaseURL";

export interface CreateBlogRequest {
  author: string;
  title: string;
  content: string;
  snippet: string;
}

export interface BlogResponse {
  blogId: string; // Đổi từ id thành blogId
  author: string;
  title: string;
  content: string;
  snippet: string;
  createdAt: string;
  updatedAt?: string;
}

export const blogAPI = {
  // Tạo blog mới
  createBlog: async (blogData: CreateBlogRequest): Promise<BlogResponse> => {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${BASE_URL}blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(blogData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  },

  // Lấy danh sách blog
  getAllBlogs: async (): Promise<BlogResponse[]> => {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${BASE_URL}blogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const result = await response.json();

    // Xử lý trường hợp API trả về data nested trong object
    if (result.data && Array.isArray(result.data)) {
      return result.data;
    }

    // Xử lý trường hợp API trả về array trực tiếp
    if (Array.isArray(result)) {
      return result;
    }

    // Trường hợp khác, trả về array rỗng
    return [];
  },

  // Lấy chi tiết blog
  getBlogById: async (blogId: string): Promise<BlogResponse> => {
    const token = localStorage.getItem("accessToken");

    const response = await fetch(`${BASE_URL}blogs/${blogId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  },

  // Cập nhật blog
  updateBlog: async (
    blogId: string,
    blogData: CreateBlogRequest
  ): Promise<BlogResponse> => {
    const token = localStorage.getItem("accessToken");

    if (!blogId || blogId === "undefined") {
      throw new Error("Blog ID is required for update");
    }

    const response = await fetch(`${BASE_URL}blogs/${blogId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(blogData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const result = await response.json();
    return result.data || result;
  },
};
