export interface CartItem {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    quantity: number;
    option?: string;
    image?: string;
  }
  
  export interface CartState {
    items: CartItem[];
    total: number;
    shipping: number;
    discount: number;
  }