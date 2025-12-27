import { Component } from '@angular/core';
import { ArticleState } from '../../models/items-state-enum';

@Component({
  selector: 'app-articles-item',
  imports: [],
  templateUrl: './articles-item.component.html',
})

export class ArticlesItemComponent {

  imageName: string = "sample-article.png";
  id: number = 10001;
  name: string = "Sample Article";
  price: number = 9.99;
  state: ArticleState = ArticleState.in_stock;
}
