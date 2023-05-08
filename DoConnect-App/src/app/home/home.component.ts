import { Component } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isLoggedIn: boolean;

  constructor(private loggedInService: LoginService){
    this.loggedInService.isLoggedIn.subscribe({
      next: data => this.isLoggedIn = !!data,
      error: error => console.log(error)
    })
  }

}
