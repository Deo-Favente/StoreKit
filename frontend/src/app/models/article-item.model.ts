import { ArticleState } from "./items-state-enum";
import { ArticleCategory, ArticleSize, ArticleCondition } from "./article-features-enum";

export interface Article {
  id: number;
  name: string;
  category: ArticleCategory;
  price: number;
  size: ArticleSize;
  state: ArticleState;
  photoCount: number;
  condition: ArticleCondition;
  detailCondition: string;
  description?: string;
}