import { Component, Output, EventEmitter } from '@angular/core';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { TokenStorageService } from './token-storage.service';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user = new User('','');
  submitted = false;
  loggedIn = false;

  constructor(
    private userService: UserService, 
    private tokenStorageService: TokenStorageService, 
    private router: Router,
    private loginService: LoginService
  ) {}

  login(){
    let loggedInUser: User;
    this.loginService.login(this.user).subscribe({
      next: data => {
        console.log(data);
        this.tokenStorageService.saveToken(data.token);
        this.userService.getUserByUsername(this.user.username).subscribe({
          next: data => {
            loggedInUser = data;
            this.loginService.setLoggedIn(loggedInUser);
            this.router.navigate(['/home']);
          },
          error: error => console.log(error)
        });
      },
      error: error => console.log(error)
    })
  }

  onSubmit(){
    this.submitted = true;
    this.login();
  }

}
