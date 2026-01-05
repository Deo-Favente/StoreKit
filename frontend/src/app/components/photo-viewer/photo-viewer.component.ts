import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface PhotoDialogData {
  photos: string[];
  currentIndex: number;
  onDelete?: (index: number) => void;
}

@Component({
  selector: 'app-photo-viewer-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './photo-viewer.component.html',
  styles: [`
    :host {
      display: block;
      width: 100vw;
      height: 100vh;
    }
  `]
})
export class PhotoViewerComponent {
  currentIndex: number;
  translateX: number = 0;
  isAnimating: boolean = false;
  touchStartX: number = 0;
  touchStartY: number = 0;
  minSwipeDistance: number = 50;

  constructor(
    public dialogRef: MatDialogRef<PhotoViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PhotoDialogData
  ) {
    this.currentIndex = data.currentIndex;
  }

  close() {
    this.dialogRef.close();
  }

  nextPhoto() {
    if (this.currentIndex < this.data.photos.length - 1) {
      this.currentIndex++;
    }
  }

  previousPhoto() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  goToPhoto(index: number) {
    this.currentIndex = index;
  }

  setAsMainImage() {
    this.dialogRef.close({ action: 'setMain', index: this.currentIndex });
  }

  deletePhoto() {
    /* pas terrible de close ici mais bon */
    this.dialogRef.close({ action: 'delete', index: this.currentIndex });
  }

 onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchMove(event: TouchEvent) {
    // Optionnel : empêcher le scroll si on veut
  }

  onTouchEnd(event: TouchEvent) {
    const touchEndX = event.changedTouches[0].clientX;
    const diff = this.touchStartX - touchEndX;

    // Swipe gauche (photo suivante)
    if (diff > 50 && this.currentIndex < this.data.photos.length - 1) {
      this.currentIndex++;
    }
    // Swipe droite (photo précédente)
    else if (diff < -50 && this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}