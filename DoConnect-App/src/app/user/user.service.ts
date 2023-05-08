import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:8080/api';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<any> {
    return this.httpClient.get(`${this.url}/user/getall`);
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.url}/user/${id}`);
  }

  getUserByUsername(username: string): Observable<User>{
    return this.httpClient.get<User>(`${this.url}/user/getbyusername/${username}`)
  }

  registerUser(user: Object): Observable<any> {
    return this.httpClient.post(`${this.url}/auth/register`, user);
  }

  updateUser(id: number, user: Object): Observable<any> {
    return this.httpClient.put(`${this.url}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  logout() {
    return this.httpClient.post(`${this.url}/auth/logout`, this.httpOptions);
  }
}
