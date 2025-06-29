export interface AnonymousPost {
  anonymousPostId: string;
  nickName: string;
  gender: string;
  title: string;
  content: string;
  createdAt: string;
  patientId: string;
  comments: Comment[];
}

export interface Comment {
  commentId: string;
  anonymousPostId: string;
  doctorId: string;
  patientId: string;
  content: string;
  createdAt: string;
}

export interface CreateCommentRequest {
  patientId: string;
  nickName: string;
  gender: string;
  title: string;
  content: string;
}

export interface CreateCommentResponse {
  anonymousPostId: string;
  doctorId: string;
  patientId: string;
  content: string;
  createdAt: string;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  tags: string[];
  topic: string;
  urgency: string;
  category: string;
  createdAt: string;
  gender: string;
  age: number;
  views: number;
  likes: number;
}

export interface StatsItem {
  label: string;
  count: number;
  description: string;
  color?: string;
}
