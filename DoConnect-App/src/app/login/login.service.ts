import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { HttpClient } from '@angular/common/http';

const STATUS_KEY = 'login';
const USER_KEY = 'currUser';
const ROLE_KEY = 'role';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn = new BehaviorSubject<boolean>(!!sessionStorage.getItem(STATUS_KEY));
  user$ = new BehaviorSubject<any>(sessionStorage.getItem(USER_KEY));
  isAdmin = new BehaviorSubject<boolean>(!!sessionStorage.getItem(ROLE_KEY));
  private url = 'http://localhost:8080/api/auth';

  constructor(
    private userService: UserService,
    private httpClient: HttpClient
  ) { }

  setLoggedIn(user: User){
    sessionStorage.setItem(STATUS_KEY, 'true');
    this.isLoggedIn.next(true);
    this.setCurrentUser(user);
    this.setAdmin();
  }

  setCurrentUser(user: any) {
    this.user$.next(user);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  setLoggedOut(){
    sessionStorage.removeItem(STATUS_KEY);
    this.isLoggedIn.next(false);
    this.isAdmin.next(false);
    this.user$.complete();
  }

  login(user: Object): Observable<any> {
    return this.httpClient.post(`${this.url}/authenticate`, user);
  }

  setAdmin(){
    if(this.user$.value.role==='ADMIN'){
      this.isAdmin.next(true);
      sessionStorage.setItem(ROLE_KEY, 'true');
    }
  }

  isUserAdmin(){
    return this.isAdmin.value;
  }

  checkLogin(){
    return this.isLoggedIn.value;
  }
  
}