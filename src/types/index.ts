export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  isbn: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.FC;
  path: string;
}