import { Component } from '@angular/core';
import { ArticlesItemComponent } from '../articles-item/articles-item.component';
import { ArticleState } from '@app/models/items-state-enum';
import { Article } from '@models/article-item.model';

@Component({
  selector: 'app-article-table',
  imports: [ArticlesItemComponent],
  templateUrl: './articles-table.component.html',
})
export class ArticleTableComponent {
  articles: Article[] = [
    { id: 1001, name: "Article One", price: 19.99, state: ArticleState.sold },
    { id: 1002, name: "Article Two", price: 29.99, state: ArticleState.in_stock },
    { id: 1003, name: "Article Three", price: 39.99, state: ArticleState.waiting_for_pic },
    { id: 1004, name: "Article Four", price: 49.99, state: ArticleState.in_stock },
  ];
} 
