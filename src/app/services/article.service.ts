import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Article {
  id: number;
  title: string;
  photoCount: number;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  // Mock data - à remplacer par un vrai appel API
  private articles: Article[] = [
    { id: 1, title: 'Article 1', photoCount: 5 },
    { id: 2, title: 'Article 2', photoCount: 3 },
    { id: 3, title: 'Article 3', photoCount: 8 },
  ];

  getArticle(id: number): Observable<Article | undefined> {
    const article = this.articles.find(a => a.id === id);
    return of(article);
  }

  getArticlePhotos(id: number, count: number): string[] {
    return Array.from({ length: count }, (_, i) => 
      `img/articles/${id}/photo${i + 1}.jpg`
    );
  }
}