import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar-button',
  imports: [MatIconModule],
  templateUrl: './navbar-button.component.html',
  styleUrl: './navbar-button.component.css'
})
export class NavbarButtonComponent {
  @Input() icon: string = '';
  @Input() label: string = '';
  @Input() selected: boolean = false;
}
