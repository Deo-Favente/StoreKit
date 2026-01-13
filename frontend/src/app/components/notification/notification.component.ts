import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NotificationService, Notification } from '@services/notification.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-notification',
  imports: [MatIconModule],
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit {
  notification: Notification | null = null;
  private timeoutId?: any;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notification$.subscribe(notification => {
      this.notification = notification;
      
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      
      this.timeoutId = setTimeout(() => {
        this.closeNotification();
      }, notification.duration || 3000);
    });
  }

  closeNotification() {
    this.notification = null;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  getNotificationClass(): string {
    const baseClasses = 'backdrop-blur-sm';
    switch (this.notification?.type) {
      case 'success':
        return `${baseClasses} bg-green-500/90`;
      case 'error':
        return `${baseClasses} bg-red-500/90`;
      case 'warning':
        return `${baseClasses} bg-orange-500/90`;
      case 'info':
        return `${baseClasses} bg-blue-500/90`;
      default:
        return `${baseClasses} bg-gray-500/90`;
    }
  }

  getIconClass(): string {
    return 'text-white';
  }

  getIcon(): string {
    switch (this.notification?.type) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'info';
    }
  }
}