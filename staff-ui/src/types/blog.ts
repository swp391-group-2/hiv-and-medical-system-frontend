export interface Blog {
  blogId: number;
  author: string;
  title: string;
  snipper: string;
  content: string;
  urlImage?: string; // URL của hình ảnh bài viết
}
