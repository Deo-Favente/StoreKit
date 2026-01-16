import { Component, Input } from '@angular/core';
import { Article } from '@models/article.model';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleService } from '@services/article.service';

@Component({
  selector: 'app-articles-item',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './articles-item.component.html',
})

export class ArticlesItemComponent {
  @Input() article!: Article;
  @Input() states!: string[];

  constructor(private articleService: ArticleService) { }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = '/img/articles/default.png';
  }

  onStateChange() {
    this.articleService.updateArticle(this.article.id, this.article).subscribe({
      error: (err) => {
        console.error(err);
      }
    });
  }
}
