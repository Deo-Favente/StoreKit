import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Article {
  id: number;
  title: string;
  photoCount: number;
  // Ajoutez d'autres propriétés selon vos besoins
}

@Component({
  selector: 'app-edit-article',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-article.component.html'})
  
export class EditArticleComponent implements OnInit {
  id: number = 0;
  title: string = '';
  photos: string[] = [];
  maxPhotos: number = 20;

  // Mapping du nombre de photos par article
  private photoCountMap: { [key: number]: number } = {
    1: 5,
    2: 3,
    3: 8,
    // Ajoutez vos articles ici
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Récupérer l'ID depuis la route (si applicable)
    const routeId = this.route.snapshot.params['id'];
    if (routeId) {
      this.id = +routeId; // Convertir en nombre
    }

    // Charger les détails de l'article
    this.loadArticleDetails();
  }

  loadArticleDetails() {
    // Pour l'instant, utiliser le mapping
    // Plus tard, vous pourrez remplacer par un appel API
    const photoCount = this.photoCountMap[this.id] || 0;
    
    this.photos = Array.from({ length: photoCount }, (_, i) => 
      `photo${i + 1}.jpg`
    );
    
    // Charger le titre (à remplacer par un vrai service)
    this.title = `Article ${this.id}`;
  }

  addPhoto() {
    if (this.photos.length < this.maxPhotos) {
      console.log('Ajouter une photo');
      // Logique pour ajouter une photo
      // Par exemple, ouvrir un input file
    }
  }

  removePhoto(index: number) {
    this.photos.splice(index, 1);
  }
}