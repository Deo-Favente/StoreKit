export interface Article {
  id: number;
  name: string;
  category: string;
  price: number;
  brandId: number;
  size: string;
  detailSize: string;
  state: number;
  photoCount: number;
  condition: string;
  detailCondition: string;
  //description: string;
  hashTags: boolean;
  returnInfos: boolean;
  dimensionPics: boolean;
  emojis: boolean;
}