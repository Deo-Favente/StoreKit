import { Component } from '@angular/core';
import { ArticlesItemComponent } from '../articles-item/articles-item.component';

@Component({
  selector: 'app-article-table',
  imports: [ArticlesItemComponent],
  templateUrl: './articles-table.component.html',
  styleUrl: './articles-table.component.css'
})
export class ArticleTableComponent {
  items: ArticlesItemComponent[] = [
    new ArticlesItemComponent(),
    new ArticlesItemComponent(),
  ];
}
