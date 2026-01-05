import { Component } from '@angular/core';
import { SearchBarComponent } from "./search-bar/search-bar.component";

@Component({
  selector: 'app-header',
  imports: [SearchBarComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {

}
