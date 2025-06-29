export interface BlogEdu {
  blogId: number;
  author: string;
  title: string;
  snippet: string;
  content: string;
  createdAt: string;
  urlImage: string;
}

export interface BlogEduResponse {
  code: number;
  success: boolean;
  message: string;
  data: BlogEdu[];
}
