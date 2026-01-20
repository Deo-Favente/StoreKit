import { PopUpService } from './../../services/popup.service';
import { NotificationService } from '@services/notification.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ArticleService } from '@services/article.service';
import { BrandService } from '@services/brand.service';
import { Article } from '@models/article.model';
import { Brand } from '@models/brand.model';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { PhotoViewerComponent } from '@components/photo-viewer/photo-viewer.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { EnumService } from '@services/enum.service';

@Component({
  selector: 'app-edit-article',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, RouterLink],
  templateUrl: './edit-article.component.html'
})

export class EditArticleComponent implements OnInit {
  article = {} as Article;
  photos: string[] = [];
  maxPhotos: number = 20;
  conditions: string[] = [];
  categories: string[] = [];
  sizes: string[] = [];
  brands: Brand[] = [];
  description: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private articleService: ArticleService, private brandService: BrandService, private enumService: EnumService, private dialog: MatDialog, private notificationService: NotificationService, private popUpService: PopUpService) { }

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
        console.log('Article chargé:', this.article);
      });
    }

    this.brandService.getAllBrands().subscribe((brands: Brand[]) => {
      this.brands = brands;
    });

    this.enumService.getConditions().subscribe((conditions: string[]) => {
      this.conditions = conditions;
    });

    this.enumService.getCategories().subscribe((categories: string[]) => {
      this.categories = categories;
    });
    this.enumService.getSizes().subscribe((sizes: string[]) => {
      this.sizes = sizes;
    });
  }

  createInitialArticle() {
    this.article = {
      id: 0,
      name: '',
      category: null!,
      price: 0,
      brandId: 0,
      size: null!,
      state: null!,
      photoCount: 0,
      condition: null!,
      detailCondition: '',
      hashTags: true,
      returnInfos: true,
      dimensionPics: true  
    };
    this.photos = [];
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
    console.log('Sauvegarde de l\'article', this.article);
    if (this.article.id === 0) {
      // Créer un nouvel article
      this.articleService.createArticle(this.article).subscribe({
        next: (createdArticle) => {
          this.article = createdArticle;
          this.saveState = 'saved';
          this.saveStateText = 'Changes saved';
          this.generateDescription();
          this.notificationService.showSuccess('Article created successfully');
          this.router.navigate(['/article', createdArticle.id], {
            replaceUrl: true
          });
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

  generateDescription() {
    // Récupérer les informations nécessaires
    const name = this.article.name || '';
    const category = this.article.category || '';
    const size = this.article.size || '';
    const condition = this.article.condition || '';
    const detailCondition = this.article.detailCondition || '';

    // Générer une description simple
    this.description = environment.descriptionTemplate
      .replace('{title}', name)
      .replace('{condition}', condition + (detailCondition ? `, ${detailCondition}` : ''))
      .replace('{category}', category.toLowerCase().replace(/[^a-z]/g, ''))
      .replace('{size}', size)

    if (this.article.dimensionPics) {
      this.description = this.description.replace('{dimPic}', '(voir dimensions à la fin)');
    } else {
      this.description = this.description.replace('{dimPic}', '');
    }

    if (this.article.returnInfos) {
      this.description = this.description.replace('{retourMessage}', environment.retourMessage);
    } else {
      this.description = this.description.replace('{retourMessage}', '');
    }

    if (this.article.hashTags) {
      this.description = this.description.replace('{tags}', environment.hastags);
    }
    else {
      this.description = this.description.replace('{tags}', '');
    }
    // put the description in the container with resize
    //this.description = description;
  }

  copyDescription() {
    if (this.description) {
      navigator.clipboard.writeText(this.description).then(() => {
        console.log('Description copiée dans le presse-papiers');
      });
    }
  }

  // Charger les photos de l'article
  loadArticlePhotos() {
    this.articleService.getPhotos(this.article.id).subscribe((photoNames: string[]) => {
      this.photos = photoNames; // On ne garde que les noms
      this.article.photoCount = this.photos.length;
      console.log('Photos chargées:', this.photos);
    });
  }

  // Ajouter une photo
  async addPhoto() {
    if (this.article.id === 0) {
      this.notificationService.showError('You must save the article before adding photos.');
      return;
    }

    if (this.photos.length >= this.maxPhotos) {
      this.notificationService.showError(`Maximum of ${this.maxPhotos} photos reached.`);
      return;
    }

    const result = await this.popUpService.showPopUp({message: 'Choose how to add photos:', actionMessage: 'Open shortcut (IOS)', action: async () => { 
      window.open("shortcuts://run-shortcut?name=StoreKit%20-%20Take%20pics&input=text&text=" + this.article.id, '_blank')} , actionMessage2: 'Upload manually', action2: async () => { this.openPhotoImport();
    }});
    if (result) {
      this.loadArticlePhotos();
    }
  }

  openPhotoImport() {
    const input = document.createElement('input');  
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.click();

    input.onchange = async () => {
      if (!input.files) return;

      const files = Array.from(input.files);
      const uploadPromises = files.map(file => 
      this.articleService.uploadPhoto(this.article.id, file).toPromise()
      );

      try {
      await Promise.all(uploadPromises);
      this.loadArticlePhotos(); // Refresh the photo list from the backend
      this.article.photoCount = this.photos.length;
      this.saveArticle();
      this.notificationService.showSuccess('Photos ajoutées avec succès !');
      } catch (err) {
      console.error(err);
      this.notificationService.showError('Erreur lors de l\'ajout des photos');
      }
    };
  }

  // Supprimer une photo par nom
  removePhoto(photoNumber: number, index: number) {

this.articleService.deletePhoto(this.article.id, this.getNameByIndex(index)).subscribe({
  next: () => {
    this.photos.splice(index, 1); // supprime localement pour UX immédiate
    this.article.photoCount = this.photos.length;
    this.saveArticle();
    this.notificationService.showSuccess('Photo supprimée !');
  },
  error: (err) => {
    console.error(err);
    this.notificationService.showError('Erreur lors de la suppression de la photo');
  }
});
  }

  removePhotoByName(photoName: string) {
    const index = photoName.replace(/^.*[\\/]/, ''); // Extraire le numéro de la chaîne*
    const photoNumber = parseInt(index, 10);

    this.removePhoto(photoNumber, parseInt(index, 10) - 1);
  }

  // Réorganisation des photos par drag & drop
  drop(event: CdkDragDrop<string[]>) {
    if (this.photos.length <= 1) return;

    // Met à jour l'ordre localement pour UX instantanée
    moveItemInArray(this.photos, event.previousIndex, event.currentIndex);

    // Appelle le back pour enregistrer le nouvel ordre
    this.articleService.switchPhotos(
      this.article.id,
      this.getNameByIndex(event.previousIndex),
      this.getNameByIndex(event.currentIndex)
    ).subscribe({
      next: () => {
        this.article.photoCount = this.photos.length;
        this.saveArticle();
        this.notificationService.showSuccess('Photos réorganisées avec succès !');
      },
      error: (err) => {
        console.error(err);
        this.notificationService.showError('Erreur lors de la réorganisation des photos');
        // si erreur, on revert l'ordre
        moveItemInArray(this.photos, event.currentIndex, event.previousIndex);
      }
    });
  }
  getNameByIndex(index: number): number {
    const photoName = this.photos[index];
    const nameOnly = photoName.replace(/^.*[\\/]/, '');
    return parseInt(nameOnly, 10);
  }

  // Ouvrir la visionneuse de photos
  openPhotoViewer(photoName: string) {
    const currentIndex = this.photos.findIndex(name => name === photoName);
    if (currentIndex === -1) return;

    this.dialog.open(PhotoViewerComponent, {
      data: {
        photos: this.photos,
        currentIndex
      },
      maxWidth: '95vw',
      maxHeight: '80vh',
      width: '95vw',
      height: '80vh',
      panelClass: 'photo-dialog'
    }).afterClosed().subscribe(result => {
      if (result?.action === 'delete') {
        this.removePhotoByName(result.photoName);

      } else if (result?.action === 'setMain') {
          const index = this.photos.findIndex(name => name === result.photoName);
          if (index === -1) return;

          // Mettre à jour localement pour UX immédiate
          this.photos.splice(index, 1);
          this.photos.unshift(result.photoName);

          // Appelle le back pour sauvegarder
          this.articleService.switchPhotos(
            this.article.id,
            this.getNameByIndex(0),
            this.getNameByIndex(index)
          ).subscribe({
            next: () => {
              this.article.photoCount = this.photos.length;
              this.saveArticle();
              this.notificationService.showSuccess('Photo principale mise à jour !');
            },
            error: (err) => {
              console.error(err);
              this.notificationService.showError('Erreur lors de la mise à jour de la photo principale');
              // revert si erreur
              this.photos.splice(0, 1);
              this.photos.splice(index, 0, result.photoName);
            }
          });
        }
    });
  }
}