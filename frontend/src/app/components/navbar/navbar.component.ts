import { Component } from '@angular/core';
import { NavbarButtonComponent } from "./navbar-button/navbar-button.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [NavbarButtonComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  // Set the selected button based on the current route
  currentRoute: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  ngOnInit() {
    this.currentRoute = this.router.url;
  }

  isSelected(route: string): boolean {
    return this.currentRoute === route;
  }
}
