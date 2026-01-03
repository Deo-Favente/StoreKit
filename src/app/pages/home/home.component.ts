import { Component } from '@angular/core';
import { ArticleTableComponent } from "./components/articles-table/articles-table.component";
import { HeaderComponent } from "@components/header/header.component";

@Component({
  selector: 'app-home',
  imports: [ArticleTableComponent, HeaderComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  title = 'storekit';

}