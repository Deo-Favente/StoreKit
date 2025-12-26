import { Component } from '@angular/core';
import { ArticleTableComponent } from "./components/articles-table/articles-table.component";

@Component({
  selector: 'app-root',
  imports: [ArticleTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'storekit';
}
