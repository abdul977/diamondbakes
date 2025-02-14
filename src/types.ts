export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
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
}