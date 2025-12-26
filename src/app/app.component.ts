import { Component } from '@angular/core';
import { ArticleTableComponent } from "./articles-table/articles-table.component";

@Component({
  selector: 'app-root',
  imports: [ArticleTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'storekit';
}
