export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  categoryId?: string;
  categoryName?: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  comment: string;
  rating: number;
  image: string;
}

export interface CategoryCard {
  id: string;
  name: string;
  image: string;
  description: string;
  link?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
}

export interface BlogComment {
  id: string;
  postId: string;
  author: string;
  content: string;
  date: string;
}

export interface FAQQuestion {
  _id?: string;
  question: string;
  answer: string;
  order: number;
}

export interface FAQCategory {
  _id?: string;
  id: string;
  name: string;
  order: number;
  questions: FAQQuestion[];
  createdAt?: string;
  updatedAt?: string;
}
