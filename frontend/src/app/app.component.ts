import { Component } from '@angular/core';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { Article } from '@models/article.model';
import { ArticleService } from '@services/article.service';
import { NotificationComponent } from '@components/notification/notification.component';
import { PopUpComponent } from './components/popup/popup.component';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, RouterOutlet, NotificationComponent, PopUpComponent],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title: string = 'com.storekit';

  articles: Article[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.articleService.getAllArticles().subscribe((data) => {
      this.articles = data;
    });
  }
}
