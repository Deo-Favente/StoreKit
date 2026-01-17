import { Component, Input } from '@angular/core';
import { Article } from '@app/models/article.model';

@Component({
  selector: 'app-export-article-popup',
  imports: [],
  templateUrl: './export-article-popup.component.html'
})
export class ExportArticlePopupComponent {
  @Input() article!: Article;

  closePopup() {
    const popup = document.getElementById(`export-popup-${this.article.id}`);
    if (popup) {
      popup.classList.add('hidden');
    }
  }
}
