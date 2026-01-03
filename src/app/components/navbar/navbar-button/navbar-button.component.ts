import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar-button',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './navbar-button.component.html'
})
export class NavbarButtonComponent {
  @Input() icon!: string;
  @Input() label!: string;
  @Input() route!: string;
  @Input() selected: boolean = false;
}