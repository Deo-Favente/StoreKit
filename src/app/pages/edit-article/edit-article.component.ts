import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ArticleService } from '@services/article.service';
import { Article } from '@models/article-item.model';
import { ArticleCategory, ArticleCondition, ArticleSize } from '@app/models/article-features-enum';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { PhotoViewerComponent } from '@components/photo-viewer/photo-viewer.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-article',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, DragDropModule],
  templateUrl: './edit-article.component.html'
})

export class EditArticleComponent implements OnInit {
  article!: Article;
  photos: string[] = [];
  maxPhotos: number = 20;
  categories = Object.values(ArticleCategory);
  conditions = Object.values(ArticleCondition);
  sizes = Object.values(ArticleSize);

  constructor(private route: ActivatedRoute, private articleService: ArticleService, private dialog: MatDialog) { }

  ngOnInit() {
    // Récupérer l'ID de l'article depuis les paramètres de la route
    const articleId = Number(this.route.snapshot.paramMap.get('id'));
    // Récupérer le nombre de photos depuis le service
    this.articleService.getArticle(articleId).subscribe((article: Article | undefined) => {
      if (article) {
        this.article = article;
      }
    });

    // Charger les détails de l'article
    this.loadArticleDetails();
  }

  loadArticleDetails() {
    // Pour l'instant, utiliser le mapping
    // Plus tard, vous pourrez remplacer par un appel API
    const photoCount = this.article.photoCount || 0;

    this.photos = Array.from({ length: photoCount }, (_, i) =>
      `img/articles/${this.article.id}/photo${i + 1}.png`
    );
  }

  addPhoto() {
    if (this.photos.length < this.maxPhotos) {
      console.log('Ajouter une photo');
    }
  }

  removePhoto(index: number) {
    this.photos.splice(index, 1);
  }

  onError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = '/img/articles/default.png';
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.photos, event.previousIndex, event.currentIndex);
    console.log('Nouvel ordre:', this.photos);
  }

openPhotoViewer(index: number) {
  this.dialog.open(PhotoViewerComponent, {
    data: {
      photos: this.photos,
      currentIndex: index
    },
    maxWidth: '95vw',
    maxHeight: '80vh',
    width: '95vw',
    height: '80vh',
    panelClass: 'photo-dialog'
  }).afterClosed().subscribe(result => {
    if (result?.action === 'delete') {
      this.removePhoto(result.index);
    } else if (result?.action === 'setMain') {
      const mainPhoto = this.photos[result.index];
      this.photos.splice(result.index, 1);
      this.photos.unshift(mainPhoto);
    }
  });
}

  generateDescription(event: Event) {
    event.preventDefault();
  }

  copyDescription(event: Event) {
    event.preventDefault();
  }
}