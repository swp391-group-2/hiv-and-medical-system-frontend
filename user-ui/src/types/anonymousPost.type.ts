export interface Comment {
  doctorImageUrl: string;
  commentId: number;
  anonymousPostId: number;
  doctorId: string;
  patientId: string;
  content: string;
  createdAt: string;
}

export interface AnonymousPost {
  anonymousPostId: number;
  nickName: string;
  gender: string;
  age: number;
  title: string;
  content: string;
  createdAt: string;
  patientId: string;
  comments: Comment[];
}

export interface AnonymousPostResponse {
  code: number;
  success: boolean;
  message: string;
  data: AnonymousPost[];
}
