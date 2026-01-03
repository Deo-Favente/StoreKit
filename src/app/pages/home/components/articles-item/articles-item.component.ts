import { Component, Input } from '@angular/core';
import { Article } from '@models/article-item.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-articles-item',
  imports: [RouterLink],
  templateUrl: './articles-item.component.html',
})

export class ArticlesItemComponent {
  @Input() article!: Article;

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = '/img/articles/default.png';
  }
}
