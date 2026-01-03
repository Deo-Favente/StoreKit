import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Article } from '@models/article-item.model';
import { ArticleState } from '@app/models/items-state-enum';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
    private articles: Article[] = [
    { id: 1001, name: 'Article 1', price: 10.99, state: ArticleState.in_stock, photoCount: 20 },
    { id: 1002, name: 'Article 2', price: 15.49, state: ArticleState.sold, photoCount: 2 },
    { id: 1003, name: 'Article 3', price: 7.99, state: ArticleState.waiting_for_pic, photoCount: 0 },
  ]; // Replace with an API call

  getArticles(): Observable<Article[]> {
    return of(this.articles);
  }

  getArticle(id: number): Observable<Article | undefined> {
    const article = this.articles.find(a => a.id === id);
    return of(article);
  }

  getPhotoCount(id: number): Observable<number> {
    const article = this.articles.find(a => a.id === id);
    return of(article?.photoCount || 0);
  }

  getArticlePhotos(id: number): Observable<string[]> {
    const article = this.articles.find(a => a.id === id);
    const photoCount = article?.photoCount || 0;
    
    const photos = Array.from({ length: photoCount }, (_, i) => 
      `img/articles/${id}/photo${i + 1}.jpg`
    );
    
    return of(photos);
  }
}