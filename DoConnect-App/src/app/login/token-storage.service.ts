import { Injectable } from '@angular/core';

const TOKEN_KEY = "authToken";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {}

  public saveToken(token: string){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string{
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

}