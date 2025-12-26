import { Component } from '@angular/core';
import { ArticleState } from '../../models/items-state-enum';

@Component({
  selector: 'app-articles-item',
  imports: [],
  templateUrl: './articles-item.component.html',
  styleUrl: './articles-item.component.css'
})

export class ArticlesItemComponent {

  imageName: string = "sample-article.png";
  name: string = "Sample Article";
  price: number = 9.99;
  state: ArticleState = ArticleState.unknown;
}
