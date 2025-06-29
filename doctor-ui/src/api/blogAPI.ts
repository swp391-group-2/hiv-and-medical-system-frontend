import { BASE_URL } from "./BaseURL";

export interface CreateBlogRequest {
  author: string;
  title: string;
  content: string;
  snippet: string;
  file?: File; // File hình ảnh để upload
}

export interface BlogResponse {
  blogId: string; // Đổi từ id thành blogId
  author: string;
  title: string;
  content: string;
  snippet: string;
  urlImage?: string; // URL hình ảnh
  createdAt: string;
  updatedAt?: string;
}

export const blogAPI = {
  // Tạo blog mới
  createBlog: async (blogData: CreateBlogRequest): Promise<BlogResponse> => {
    const token = localStorage.getItem("accessToken");

    // Tạo data object chứa thông tin blog
    const data = {
      author: blogData.author,
      title: blogData.title,
      content: blogData.content,
      snippet: blogData.snippet,
    };

    const url = new URL(`${BASE_URL}blogs`);

    let body: FormData | string;
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    if (blogData.file) {
      // Khi có file: dùng FormData với data và file
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("file", blogData.file);
      body = formData;
      // Không set Content-Type để browser tự động set multipart/form-data boundary
      console.log("Creating blog WITH file via FormData");
    } else {
      // Khi không có file: dùng JSON thường
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
      console.log("Creating blog WITHOUT file via JSON");
    }

    console.log("Creating blog with URL:", url.toString());
    console.log("Data:", data);
    console.log("Has file:", !!blogData.file);

    if (blogData.file && body instanceof FormData) {
      console.log("FormData entries:");
      for (const [key, value] of body.entries()) {
        console.log(key, typeof value === "string" ? value : "File object");
      }
    }

    const response = await fetch(url.toString(), {
      method: "POST",
      headers,
      body,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Blog creation failed:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
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

    // Tạo data object chứa thông tin blog
    const data = {
      author: blogData.author,
      title: blogData.title,
      content: blogData.content,
      snippet: blogData.snippet,
    };

    const url = new URL(`${BASE_URL}blogs/${blogId}`);

    // Luôn dùng FormData cho update để đảm bảo tương thích
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    // Chỉ append file khi có file mới được chọn
    if (blogData.file) {
      formData.append("file", blogData.file);
      console.log("Updating blog WITH new file");
    } else {
      console.log("Updating blog WITHOUT changing file");
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };
    // Không set Content-Type để browser tự động set multipart/form-data boundary

    console.log("Updating blog with URL:", url.toString());
    console.log("Data:", data);
    console.log("Has file:", !!blogData.file);
    console.log("FormData entries:");
    for (const [key, value] of formData.entries()) {
      console.log(key, typeof value === "string" ? value : "File object");
    }

    const response = await fetch(url.toString(), {
      method: "PUT",
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Blog update failed:", {
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const result = await response.json();
    return result.data || result;
  },
};
