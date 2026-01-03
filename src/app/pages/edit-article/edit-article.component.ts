import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticleService } from '@services/article.service';
import { Article } from '@models/article-item.model';

@Component({
  selector: 'app-edit-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-article.component.html'})

export class EditArticleComponent implements OnInit {
  article!: Article;
  photos: string[] = [];
  maxPhotos: number = 20;

  constructor(private route: ActivatedRoute, private articleService: ArticleService) {}

  ngOnInit() {
    // Récupérer l'ID de l'article depuis les paramètres de la route
    const articleId = Number(this.route.snapshot.paramMap.get('id'));
    // Récupérer le nombre de photos depuis le service
    this.articleService.getArticle(articleId).subscribe((article: Article | undefined) => {
      if (article) {
        this.article = article;
      } else {
        console.error('Article not found');
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
}