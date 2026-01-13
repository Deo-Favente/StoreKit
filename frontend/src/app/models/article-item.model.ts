export interface Article {
  id: number;
  name: string;
  category: string;
  price: number;
  brand: string;
  size: string;
  state: number;
  photoCount: number;
  condition: string;
  detailCondition: string;
  description?: string;
}