export interface Comment {
  commentId: number;
  anonymousPostId: number;
  doctorId: string;
  doctorName: string;
  doctorImageUrl: string;
  patientId: string;
  content: string;
  createdAt: string;
}

export interface AnonymousPost {
  anonymousPostId: number;
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
