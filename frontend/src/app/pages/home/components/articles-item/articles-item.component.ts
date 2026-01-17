import { Component, Input } from '@angular/core';
import { Article } from '@models/article.model';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleService } from '@services/article.service';
import { MatIcon } from "@angular/material/icon";
import { OnInit } from '@angular/core';
import { NotificationService } from '@app/services/notification.service';

@Component({
  selector: 'app-articles-item',
  imports: [RouterLink, CommonModule, FormsModule, MatIcon],
  templateUrl: './articles-item.component.html',
})

export class ArticlesItemComponent implements OnInit {
  @Input() article!: Article;
  @Input() states!: string[];
  photoUrl: string = '';
  descriptionToCopy: string = '';

  constructor(private articleService: ArticleService, private notificationService: NotificationService) {}
  ngOnInit() {
    this.articleService.getPhotos(this.article.id).subscribe({
      next: (photos) => {
        this.photoUrl = photos[0] || '';
        this.descriptionToCopy = this.article.description || '';
      },
      error: (err) => {
        console.error('Error fetching photos:', err);
      }
    });
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
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

showExportArticlePopup() {
  this.copyToClipboardSync(this.descriptionToCopy);
  window.open('https://www.vinted.fr/items/new', '_blank');
  this.notificationService.showSuccess('Description copiée ✔');
}

copyToClipboardSync(text: string) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';

  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand('copy');
  } finally {
    document.body.removeChild(textarea);
  }
}
}
