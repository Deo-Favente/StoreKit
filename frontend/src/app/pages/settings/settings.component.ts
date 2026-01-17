import { BrandService } from './../../services/brand.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '@app/services/notification.service';

@Component({
  selector: 'app-settings',
  imports: [FormsModule],
  templateUrl: './settings.component.html'
})

export class SettingsComponent {
  constructor(private brandService: BrandService, private notificationService: NotificationService) {}

  newBrandName: string = '';

  createBrand() {
    if (this.newBrandName.trim()) {
      this.brandService.createBrand(this.newBrandName).subscribe({
        next: (response) => {
          this.notificationService.showSuccess(`Brand "${response.name}" created successfully!`);
          this.newBrandName = '';
        },
        error: (error) => {
          this.notificationService.showError('Error creating brand: ' + error.message);
        }
      });
    } 
  }
}
