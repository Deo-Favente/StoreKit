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

  async showExportArticlePopup() {
    // Étape 1 : Télécharger les photos
    const step1 = await this.popupService.showPopUp({ 
      message: 'Etape 1 : Download all photos',
      action: () => this.downloadAllPhotos(),
      actionMessage: 'Download (.zip)' 
    });
    if (!step1) return; // Arrêter si l'utilisateur annule

    // Étape 2 : Extraction des photos
    const step2 = await this.popupService.showPopUp({ 
      message: 'Etape 2 : Extract photos in the "TheFlowRush" album.',
      action: () => this.extractPhotos(), 
      actionMessage: 'Extract (iOS shortcut)' 
    });
    if (!step2) return;

    // Étape 3 : Copie de la description
    const step3 = await this.popupService.showPopUp({ 
      message: 'Etape 3 : Copy the description.',
      action: () => this.copyToClipboard(this.descriptionToCopy), 
      actionMessage: 'Copy'
    });
    if (!step3) return;

    // Étape 4 : Ouverture de Vinted
    await this.popupService.showPopUp({ 
      message: 'Etape 4 : Open Vinted to create a new listing.',
      action: async () => { window.open('https://www.vinted.fr/items/new', '_blank'); }, 
      actionMessage: 'Open Vinted' 
    });
  }

  async copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text);
  }

  async downloadAllPhotos() {
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
    const shortcutUrl = 'shortcuts://run-shortcut?name=StoreKit%20-%20Save%20pics&input=text&text=' + 
      encodeURIComponent(`article_${this.article.id}_photos`);
    window.open(shortcutUrl, '_blank');
  }
}