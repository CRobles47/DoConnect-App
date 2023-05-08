import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../login/token-storage.service';

const AUTH_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenStorageService: TokenStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenStorageService.getToken();
    if(token != null){
      request = request.clone({ 
        headers: request.headers.set(AUTH_HEADER_KEY, 'Bearer ' + token)
      });
    }
    console.log(request);
    return next.handle(request);
  }
}
