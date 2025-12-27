import { Component } from '@angular/core';
import { ArticleTableComponent } from "./components/articles-table/articles-table.component";
import { HeaderComponent } from "./components/header/header.component";
import { NavbarComponent } from "./components/navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [ArticleTableComponent, HeaderComponent, NavbarComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'storekit';
}
