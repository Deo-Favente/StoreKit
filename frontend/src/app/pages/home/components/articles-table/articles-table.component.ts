import { ArticleService } from '@services/article.service';
import { Component } from '@angular/core';
import { ArticlesItemComponent } from '../articles-item/articles-item.component';
import { Article } from '@models/article.model';
import { EnumService } from '@services/enum.service';

@Component({
  selector: 'app-article-table',
  imports: [ArticlesItemComponent],
  templateUrl: './articles-table.component.html',
})
export class ArticleTableComponent {
  articles: Article[] = [];
  states: string[] = [];

  constructor(private articleService: ArticleService, private enumService: EnumService) {
    this.loadArticles();
    this.loadStates();
  }
  loadArticles() {
    this.articleService.getAllArticles().subscribe((data) => {
      this.articles = data;
    });
}
  loadStates() {
    this.enumService.getStates().subscribe((data) => {
      this.states = data;
    });
  }
} 
