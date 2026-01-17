import { Article } from '@models/article.model';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrlArticles = `${environment.apiUrl}/articles`;

  constructor(private http: HttpClient) { }

  getAllArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrlArticles);
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrlArticles}/${id}`);
  }

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrlArticles, article);
  }

  updateArticle(id: number, article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrlArticles}/${id}`, article);
  }

  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlArticles}/${id}`);
  }

  uploadPhoto(articleId: number, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.apiUrlArticles}/${articleId}/photos`, formData, {
      responseType: 'text'
    }).pipe(
      map(url => this.getFullPhotoUrl(url))
    );
  }

  getPhotos(articleId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrlArticles}/${articleId}/photos`)
      .pipe(
        map(urls => urls.map(url => this.getFullPhotoUrl(url)))
      );
  }

  getPhoto(articleId: number, photoNumber: number): string {
    return `${environment.apiUrl}/articles/${articleId}/photos/${photoNumber}`;
  }

  deletePhoto(articleId: number, photoNumber: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlArticles}/${articleId}/photos/${photoNumber}`);
  }

  private getFullPhotoUrl(relativeUrl: string): string {
    // Si l'URL commence par /api, on ajoute juste la base URL
    if (relativeUrl.startsWith('/api')) {
      return `${environment.apiUrl.replace('/api', '')}${relativeUrl}`;
    }
    // Sinon on considère que c'est déjà une URL complète
    return relativeUrl;
  }

  switchPhotos(articleId: number, photoNumber1: number, photoNumber2: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrlArticles}/${articleId}/photos/switch`, {
      number1: photoNumber1,
      number2: photoNumber2
    });
  }
}