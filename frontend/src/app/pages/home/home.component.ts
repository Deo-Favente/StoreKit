import { Component } from '@angular/core';
import { ArticleTableComponent } from "./components/articles-table/articles-table.component";
import { HeaderComponent } from "@components/header/header.component";
import { AddArticleButtonComponent } from "./components/add-article-button/add-article-button.component"

@Component({
  selector: 'app-home',
  imports: [ArticleTableComponent, HeaderComponent, AddArticleButtonComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  title = 'com.storekit';

}
