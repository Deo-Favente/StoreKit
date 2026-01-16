import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '@services/notification.service';

export const HttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);
  
  return next(req).pipe(
    catchError(error => {
      if (error.status === 0) {
        notificationService.showError('Can\'t reach the server');
      } else if (error.status === 404) {
        notificationService.showError('Not found');
      } else if (error.status === 500) {
        const message = error.error?.detail || 'Server error';
        notificationService.showError(message);
      } else if (error.status === 403) {
        notificationService.showError('Access forbidden');
      } else {
        const message = error.error?.detail || 'An error occurred';
        notificationService.showError(message);
      }
      
      return throwError(() => error);
    })
  );
};