import { Component } from '@angular/core';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { Article } from '@models/article-item.model';
import { ArticleService } from '@services/article.service';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title: string = 'storekit';

  articles: Article[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.articleService.getArticles().subscribe((data) => {
      this.articles = data;
    });
  }
}
