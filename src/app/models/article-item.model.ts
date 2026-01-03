import { ArticleState } from "./items-state-enum";

export interface Article {
  id: number;
  name: string;
  price: number;
  state: ArticleState;
}