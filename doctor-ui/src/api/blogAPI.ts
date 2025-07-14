import { BASE_URL } from "./BaseURL";

export interface CreateBlogRequest {
  author: string;
  title: string;
  content: string;
  snippet: string;
  doctorId?: string;
  file?: File;
}

export interface DoctorInfo {
  id: string;
  userId: string;
  email: string;
  fullName: string;
  specialization: string;
  userStatus: string;
  doctorCode: string;
  doctorRating: string;
  urlImage: string;
}

export interface BlogResponse {
  blogId: string;
  author: string;
  title: string;
  content: string;
  snippet: string;
  urlImage?: string;
  createdAt: string;
  updatedAt?: string;
}

export const blogAPI = {
  createBlog: async (blogData: CreateBlogRequest): Promise<BlogResponse> => {
    const token = localStorage.getItem("accessToken");

    const data = {
      author: blogData.author,
      title: blogData.title,
      content: blogData.content,
      snippet: blogData.snippet,
      doctorId: blogData.doctorId,
    };

    const url = new URL(`${BASE_URL}blogs`);

    let body: FormData | string;
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    if (blogData.file) {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      formData.append("file", blogData.file);
      body = formData;

      console.log("Creating blog WITH file via FormData");
    } else {
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

    const result = await response.json();
    console.log("=== CREATE RESPONSE ===");
    console.log("Create result:", result);
    console.log("Create urlImage:", result.urlImage || result.data?.urlImage);
    return result;
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

  // Lấy danh sách blog theo doctorId
  getBlogsByDoctorId: async (doctorId: string): Promise<BlogResponse[]> => {
    const token = localStorage.getItem("accessToken");

    if (!doctorId) {
      throw new Error("Doctor ID is required");
    }

    const response = await fetch(`${BASE_URL}blogs/doctor/${doctorId}`, {
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

    const data = {
      author: blogData.author,
      title: blogData.title,
      content: blogData.content,
      snippet: blogData.snippet,
      doctorId: blogData.doctorId, // Thêm doctorId
    };

    const url = new URL(`${BASE_URL}blogs/${blogId}`);

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    if (blogData.file) {
      // Chỉ dùng field name giống hệt CREATE
      formData.append("file", blogData.file);
      console.log("Updating blog WITH new file");
      console.log("File name:", blogData.file.name);
      console.log("File size:", blogData.file.size);
      console.log("File type:", blogData.file.type);
    } else {
      console.log("Updating blog WITHOUT changing file");
    }

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

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
    console.log("=== UPDATE RESPONSE ===");
    console.log("Update result:", result);
    console.log("New urlImage:", result.urlImage || result.data?.urlImage);

    // Nếu có file nhưng urlImage vẫn null, thử get lại sau 2 giây
    if (blogData.file && !(result.urlImage || result.data?.urlImage)) {
      console.log("urlImage is null, retrying after 2 seconds...");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      try {
        const retryResult = await blogAPI.getBlogById(blogId);
        console.log("=== RETRY RESULT ===");
        console.log("Retry urlImage:", retryResult.urlImage);
        if (retryResult.urlImage) {
          return retryResult;
        }
      } catch (retryError) {
        console.error("Retry failed:", retryError);
      }
    }

    return result.data || result;
  },

  // Lấy thông tin bác sĩ hiện tại từ token
};
