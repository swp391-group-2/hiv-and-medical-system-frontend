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
