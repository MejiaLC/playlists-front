import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth');
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: token } })
    : req;

  return next(authReq);
};

