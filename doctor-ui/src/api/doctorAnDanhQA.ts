import { BASE_URL } from "./BaseURL";
import type {
  AnonymousPost,
  CreateCommentResponse,
  CommentsResponse,
  Comment,
  Doctor,
} from "@/types/qaType";
import { fetchMyDoctorInfo } from "./doctorProfileAPI";

export const getAnonymousPosts = async (): Promise<AnonymousPost[]> => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${BASE_URL}anonymous-posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data || [];
};

export const getCommentsForPost = async (
  anonymousPostId: string
): Promise<Comment[]> => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(
    `${BASE_URL}comments/${anonymousPostId}/content`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const data: CommentsResponse = await response.json();
  return data.data || [];
};

export const replyToAnonymousPost = async (
  anonymousPostId: string,
  content: string
): Promise<CreateCommentResponse> => {
  const token = localStorage.getItem("accessToken");

  console.log("=== GETTING DOCTOR INFO FROM API ===");

  // Lấy thông tin bác sĩ từ API để có doctorId chính xác
  let doctorId = null;
  try {
    const doctorInfo = await fetchMyDoctorInfo();
    console.log("Doctor info from API:", doctorInfo);
    doctorId = doctorInfo?.id || doctorInfo?.doctorId;
  } catch (error) {
    console.error("Error fetching doctor info:", error);
  }

  // Fallback: thử decode token để lấy thông tin user
  if (!doctorId) {
    console.log("=== FALLBACK: CHECKING TOKEN ===");
    try {
      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log("Token payload:", payload);
        doctorId =
          payload.doctorId || payload.id || payload.sub || payload.userId;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  // Fallback: thử localStorage
  if (!doctorId) {
    console.log("=== FALLBACK: CHECKING LOCALSTORAGE ===");
    Object.keys(localStorage).forEach((key) => {
      console.log(`${key}:`, localStorage.getItem(key));
    });

    const altUserInfo =
      localStorage.getItem("user") ||
      localStorage.getItem("currentUser") ||
      localStorage.getItem("authUser");
    if (altUserInfo) {
      try {
        const parsed = JSON.parse(altUserInfo);
        console.log("Alternative user info:", parsed);
        doctorId = parsed.doctorId || parsed.id || parsed.userId;
      } catch (error) {
        console.error("Error parsing alternative user info:", error);
      }
    }
  }

  console.log("=== FINAL DOCTOR ID ===");
  console.log("Final doctorId:", doctorId);

  if (!doctorId) {
    throw new Error(
      "Cannot get doctor ID. Please make sure you are logged in as a doctor."
    );
  }

  // Validate inputs
  if (!anonymousPostId || !content.trim()) {
    throw new Error("Missing required fields: anonymousPostId or content");
  }

  const parsedPostId = parseInt(anonymousPostId);
  if (isNaN(parsedPostId)) {
    throw new Error("Invalid anonymousPostId format");
  }

  const requestBody = {
    content: content.trim(),
    doctorId: String(doctorId),
    anonymousPostId: parsedPostId,
  };

  console.log("=== FINAL REQUEST ===");
  console.log("Request body:", requestBody);

  const url = `${BASE_URL}comments/me`;
  console.log("URL:", url);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    console.log("Response status:", response.status);

    if (response.ok) {
      const data = await response.json();
      console.log("Response SUCCESS:", data);
      return data.data || data;
    } else {
      // Try to parse error response
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
        console.error("Response error JSON:", errorData);
      } catch {
        const errorText = await response.text();
        console.error("Response error text:", errorText);
        if (errorText) errorMessage = errorText;
      }
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const getDoctorById = async (doctorId: string): Promise<Doctor> => {
  const token = localStorage.getItem("accessToken");

  const response = await fetch(`${BASE_URL}doctors/${doctorId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data || data;
};
