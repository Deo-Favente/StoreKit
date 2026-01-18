// ngrok.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const NgrokInterceptor: HttpInterceptorFn = (req, next) => {
  const cloned = req.clone({
    setHeaders: {
      'ngrok-skip-browser-warning': 'true'
    }
  });
  return next(cloned);
};
