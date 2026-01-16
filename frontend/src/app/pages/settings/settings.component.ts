import { BrandService } from './../../services/brand.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  imports: [FormsModule],
  templateUrl: './settings.component.html'
})

export class SettingsComponent {
  constructor(private brandService: BrandService) {}

  newBrandName: string = '';

  createBrand() {
    if (this.newBrandName.trim()) {
      this.brandService.createBrand(this.newBrandName).subscribe({
        next: (response) => {
          alert(`Brand "${response.name}" created successfully!`);
          this.newBrandName = '';
        },
        error: (error) => {
          alert('Error creating brand: ' + error.message);
        }
      });
    } 
  }
}
