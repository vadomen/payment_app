import { AuthService } from '../authentication/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
  constructor(private authService: AuthService) {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getAuthorizationToken() || '';
    const authReq = req.clone({ setHeaders: { Authorization: authToken } });
    return next.handle(authReq);
  }
}