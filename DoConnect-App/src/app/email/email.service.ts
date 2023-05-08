import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from './email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private baseUrl: string = ''

  constructor(private httpClient: HttpClient) { }

  sendEmail(email: Email): Observable<any>{
    return this.httpClient.post('http://localhost:8080/api/sendemail', email);
  }
}
