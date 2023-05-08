import { Component } from '@angular/core';
import { NewUser } from '../user/new-user';
import { UserService } from '../user/user.service';
import { Admin } from 'src/app/admin/admin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  newUser = new NewUser('','','');
  newAdmin = new Admin('','','');
  submitted = false;
  successful = false;
  isAdmin = false;
  userToSave!: any;

  constructor(
    private userService: UserService,  
    private router: Router
  ){}

  register(userToSave: any){
    sessionStorage.clear();
    this.userService.registerUser(userToSave).subscribe({
      next: data => {
        console.log(data);
        this.successful = true;
        this.router.navigateByUrl('/home');
        alert("Registration Success, Please Log In");
      },
      error: error => {
        console.log(error);
        this.successful = false;
      }
    });
  }

  onSubmit(){
    this.submitted = true;
    if(this.isAdmin){
      this.register(this.newAdmin);
    } else {
      this.register(this.newUser);
    }
  }

  setAdmin(){
    this.isAdmin = !this.isAdmin;
  }

}
