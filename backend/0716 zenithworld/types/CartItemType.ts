export interface CartItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  checked: boolean;
  option?: string;
  addedAt?: number;
  brand?: string;
} 