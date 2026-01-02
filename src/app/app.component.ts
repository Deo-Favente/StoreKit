import { Component } from '@angular/core';
import { HeaderComponent } from '@components/header/header.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { HomeComponent } from "@pages/home/home.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, NavbarComponent, HomeComponent, RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'storekit';
}
