import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '@services/notification.service';

export const HttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);
  
  return next(req).pipe(
    catchError(error => {
      if (error.status === 0) {
        notificationService.showError('Impossible de se connecter au serveur');
      } else if (error.status === 404) {
        notificationService.showError('Ressource introuvable');
      } else if (error.status === 500) {
        const message = error.error?.detail || 'Erreur serveur';
        notificationService.showError(message);
      } else if (error.status === 403) {
        notificationService.showError('Accès refusé');
      } else if (error.status === 500) {
        notificationService.showError('Erreur serveur');
      } else {
        const message = error.error?.detail || 'Une erreur est survenue';
        notificationService.showError(message);
      }
      
      return throwError(() => error);
    })
  );
};