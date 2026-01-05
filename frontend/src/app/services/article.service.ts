import { Article } from '@models/article-item.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ArticleState } from '@app/models/items-state-enum';
import { ArticleCategory, ArticleSize, ArticleCondition } from '@app/models/article-features-enum';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
    private articles: Article[] = [
    { id: 1001, name: 'Article 1', price: 10.99, brand: "Nike", state: ArticleState.in_stock, photoCount: 20, condition: ArticleCondition.new_with_label, category: ArticleCategory.Tshirt, size: ArticleSize.M, detailCondition: 'Brand new with tags', description: 'A stylish T-shirt perfect for casual wear.' },
    { id: 1002, name: 'Article 2', price: 15.49, brand: "Adidas", state: ArticleState.sold, photoCount: 2, condition: ArticleCondition.good, category: ArticleCategory.Other, size: ArticleSize.OneSize, detailCondition: 'Lightly used' },
    { id: 1003, name: 'Article 3', price: 7.99, brand: "Vintage", state: ArticleState.waiting_for_pic, photoCount: 0, condition: ArticleCondition.satisfying, category: ArticleCategory.Pants, size: ArticleSize.S, detailCondition: 'Some wear and tear' },
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