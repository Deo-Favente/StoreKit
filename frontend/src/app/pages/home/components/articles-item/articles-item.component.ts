import { Component, Input } from '@angular/core';
import { Article } from '@models/article.model';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleService } from '@services/article.service';
import { MatIcon } from "@angular/material/icon";
import { OnInit } from '@angular/core';
import { PopUpService } from '@services/popup.service';
import JSZip from 'jszip';

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

  constructor(private articleService: ArticleService, private popupService: PopUpService) { }
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
    //this.showExportArticlePopup();
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
    this.popupService.showPopUp({ message: 'Etape 1 : Télécharger les photos', action: () => this.downloadAllPhotos(), actionMessage: 'Télécharger (.zip)' });
    this.popupService.showPopUp({ message: 'Etape 2 : Extraction des photos dans le dossier "TheFlowRush".', action: () => this.extractPhotos(), actionMessage: 'Extraire (raccourci iOS)' });
    this.popupService.showPopUp({ message: 'Etape 3 : Copie de la description dans le presse-papiers.', action: () => this.copyToClipboardSync(this.descriptionToCopy), actionMessage: 'Copier' });
    this.popupService.showPopUp({ message: 'Etape 4 : Ouverture de Vinted', action: () => window.open('https://www.vinted.fr/items/new', '_blank'), actionMessage: 'Ouvrir Vinted' });
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

  async downloadAllPhotos() {
    // put all files in a zip and download it
    const zip = new JSZip();
    const photos = await this.articleService.getPhotos(this.article.id).toPromise();
    if (photos) {
      for (let i = 0; i < photos.length; i++) {
        const photoUrl = photos[i];
        const response = await fetch(photoUrl);
        const blob = await response.blob();
        zip.file(`photo_${i + 1}.jpg`, blob);
      }
      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = `article_${this.article.id}_photos.zip`;
      link.click();
      URL.revokeObjectURL(link.href);
    }
  }

  async extractPhotos() {
    // Open the iphone shortuct 
    const shortcutUrl = 'shortcuts://run-shortcut?name=TheFlowRush&input=text&text=' + encodeURIComponent(`article_${this.article.id}_photos.zip`);
    window.open(shortcutUrl, '_blank');
  }
}
