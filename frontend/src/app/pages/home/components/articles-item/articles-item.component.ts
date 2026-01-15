import { Component, Input } from '@angular/core';
import { Article } from '@models/article.model';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-articles-item',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './articles-item.component.html',
})

export class ArticlesItemComponent {
  @Input() article!: Article;

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = '/img/articles/default.png';
  }
}
