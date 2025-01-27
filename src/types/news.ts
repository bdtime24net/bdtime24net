export interface NewsArticle {
  _id: string;
  title: string;
  subtitle: string;
  location: string;
  category: string;
  description: string;
  content: string;
  authorId: string;
  imageUrl: string;
  link: string;
  tags: string[];
  views: number;
  likes: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
  }