import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ArticleService } from '@services/article.service';
import { Brand, BrandService } from '@services/brand.service';
import { Article } from '@models/article-item.model';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { PhotoViewerComponent } from '@components/photo-viewer/photo-viewer.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-edit-article',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, DragDropModule],
  templateUrl: './edit-article.component.html'
})

export class EditArticleComponent implements OnInit {
  article = {} as Article;
  photos: string[] = [];
  maxPhotos: number = 20;
  conditions = [];
  categories = [];
  sizes = [];

  brands: string[] = [];

  constructor(private route: ActivatedRoute, private articleService: ArticleService, private brandService: BrandService, private dialog: MatDialog) { }

  ngOnInit() {
    this.subscription = this.articleChanges$
      .pipe(
        debounceTime(1000),
      )
      .subscribe(() => {
        this.saveArticle();
      });

    // Récupérer l'ID de l'article depuis les paramètres de la route
    const rawId = this.route.snapshot.paramMap.get('id');

    if (rawId === 'new') {
      this.createInitialArticle();
    } else {
      const articleId = Number(rawId);
      // Récupérer le nombre de photos depuis le service
      this.articleService.getArticle(articleId).subscribe((article: Article) => {
        this.article = article;
        // Charger les détails de l'article
        this.loadArticlePhotos();
        // Charger la description
        this.generateDescription();
      });

      /*
      // Charger les marques
      this.brandService.getAllBrands().subscribe((brands: Brand[]) => {
        this.brands = brands.map(brand => brand.name);
      });
      */
    }
  }

  createInitialArticle() {
    this.article = {
      id: 0,
      name: '',
      category: null!,
      price: 0,
      brand: '',
      size: null!,
      state: null!,
      photoCount: 0,
      condition: null!,
      detailCondition: '',
    };
    this.photos = [];
  }


  loadArticlePhotos() {
    const photoCount = this.article.photoCount || 0;

    this.photos = Array.from({ length: photoCount }, (_, i) =>
      `img/articles/${this.article.id}/photo${i + 1}.png`
    );
  }

  // États de sauvegarde
  saveState: 'saved' | 'saving' | 'unsaved' = 'saved';
  saveStateText: string = 'Saved changes';
  private articleChanges$ = new Subject<any>();
  private subscription?: Subscription;

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  // Appelée à chaque modification d'un champ
  onArticleChange() {
    this.saveState = 'unsaved';
    this.saveStateText = 'Unsaved changes...';
    this.articleChanges$.next(this.article);
  }

  // Sauvegarde l'article
  private saveArticle() {
    this.saveState = 'saving';
    this.saveStateText = 'Saving changes...';

    if (this.article.id === 0) {
      // Créer un nouvel article
      this.articleService.createArticle(this.article).subscribe({
        next: (createdArticle) => {
          this.article = createdArticle;
          this.saveState = 'saved';
          this.saveStateText = 'Changes saved';
          this.generateDescription();
        },
        error: (err) => {
          this.saveState = 'unsaved';
          this.saveStateText = 'Error creating article';
          console.error(err);
      }
      });

    } else {
      this.articleService.updateArticle(this.article.id, this.article).subscribe({
        next: () => {
          this.saveState = 'saved';
          this.saveStateText = 'Changes saved';
          this.generateDescription();
        },
        error: (err) => {
          this.saveState = 'unsaved';
          this.saveStateText = 'Error saving changes';
          console.error(err);
        }
      });
    }
  }

  // Obtenir la classe CSS selon l'état
  getSaveStateClass(): string {
    switch (this.saveState) {
      case 'saved':
        return 'text-green-500';
      case 'saving':
        return 'text-blue-500';
      case 'unsaved':
        return 'text-orange-500';
      default:
        return 'text-gray-500';
    }
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

  generateDescription() {
    // Récupérer les informations nécessaires
    const name = this.article.name || '';
    const category = this.article.category || '';
    const size = this.article.size || '';
    const condition = this.article.condition || '';
    const detailCondition = this.article.detailCondition || '';

    // Générer une description simple
    const description = environment.descriptionTemplate
      .replace('{condition}', condition)
      .replace('{brand}', this.article.brand || '')
      .replace('{category}', category)
      .replace('{size}', size);

    this.article.description = description;
  }

  copyDescription() {

    if (this.article.description) {
      navigator.clipboard.writeText(this.article.description).then(() => {
        console.log('Description copiée dans le presse-papiers');
      });
    }
  }
}