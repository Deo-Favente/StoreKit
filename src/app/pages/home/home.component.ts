import { Component } from '@angular/core';
import { ArticleTableComponent } from "./components/articles-table/articles-table.component";

@Component({
  selector: 'app-home',
  imports: [ArticleTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'storekit';

}