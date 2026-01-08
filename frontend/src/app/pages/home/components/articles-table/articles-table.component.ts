import { ArticleService } from './../../../../services/article.service';
import { Component } from '@angular/core';
import { ArticlesItemComponent } from '../articles-item/articles-item.component';
import { Article } from '@models/article-item.model';

@Component({
  selector: 'app-article-table',
  imports: [ArticlesItemComponent],
  templateUrl: './articles-table.component.html',
})
export class ArticleTableComponent {
  articles: Article[] = [];

  constructor(private articleService: ArticleService) {
    this.loadArticles();
  }
  loadArticles() {
    this.articleService.getAllArticles().subscribe((data) => {
      this.articles = data;
    });
}
} 
