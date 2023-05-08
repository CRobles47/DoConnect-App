import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './login/token-storage.service';
import { UserService } from './user/user.service';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'mdb-angular-ui-kit-free';
  public isLoggedIn: boolean;
  public isAdmin: boolean;

  constructor(
    private userService: UserService, 
    private tokenStorageService: TokenStorageService, 
    private router: Router, 
    private loginService: LoginService,
  ){
    this.loginService.isLoggedIn.subscribe({
      next: data => this.isLoggedIn = data,
      error: error => console.log(error)
    })
    
    this.loginService.isAdmin.subscribe({
      next: data => this.isAdmin = data,
      error: error => console.log(error)
    })
  }

  ngOnInit(): void {
  }

  createAQuestion() {
    this.router.navigateByUrl('/createquestion');
  }

  logout(){
    this.userService.logout().subscribe({
      next: data => console.log(data),
      error: error => console.log(error)
    });
    this.loginService.setLoggedOut();
    sessionStorage.clear();
    this.router.navigateByUrl('/home');
  }

  adminDashboard(){
    
  }

}
