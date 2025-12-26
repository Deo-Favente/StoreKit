import { Component } from '@angular/core';

@Component({
  selector: 'app-articles-item',
  imports: [],
  templateUrl: './articles-item.component.html',
  styleUrl: './articles-item.component.css'
})
export class ArticlesItemComponent {
  name: string = "Sample Article";
  price: number = 9.99;
}
