import { Component, Input } from '@angular/core';
import { Article } from '@models/article.model';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleService } from '@services/article.service';
import { MatIcon } from "@angular/material/icon";
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-articles-item',
  imports: [RouterLink, CommonModule, FormsModule, MatIcon],
  templateUrl: './articles-item.component.html',
})

export class ArticlesItemComponent implements OnInit {
  @Input() article!: Article;
  @Input() states!: string[];
  photoUrl: string = '';

  constructor(private articleService: ArticleService) { }
  ngOnInit() {
    this.photoUrl = this.articleService.getPhotoUrl(this.article.id, 1);
  }
  onStateChange() {
    this.articleService.updateArticle(this.article.id, this.article).subscribe({
      error: (err) => {
        console.error(err);
      }
    });
  }

  deleteArticle() {
    this.articleService.deleteArticle(this.article.id).subscribe({
      next: () => {
        // refresh the page or remove the article from the list
        window.location.reload();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
