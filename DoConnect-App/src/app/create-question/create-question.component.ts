import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question-list/question.service';
import { Question } from '../question-list/question';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { LoginService } from '../login/login.service';
import { NgForm } from '@angular/forms';
import { error } from 'console';
import { Observable } from 'rxjs';
import { FileService } from '../file/file.service';
import { EmailService } from '../email/email.service';
import { Email } from '../email/email';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit{
  question = new Question(0,'', false, '', '', 0, 0, new Date(), '');
  user: User;
  submitted = false;
  selectedCategory: string;
  currentFile: File;
  selectedFiles: FileList;
  fileName: string;
  email = new Email('','');

  categories: Category[] = [
    {name: 'Frontend',},
    {name: 'Backend'},
    {name: 'Database'},
    {name: 'Server'},
    {name: 'HTTP'},
    {name: 'HTML'},
    {name: 'CSS'},
    {name: 'Java'},
    {name: 'JavaScript'},
    {name: 'Python'},
    {name: 'CSS'},
    {name: 'JQuery'},
    {name: 'Spring/Spring Boot'},
    {name: 'Angular'},
    {name: 'TypeScript'},
    {name: 'React'},
    {name: 'C'},
    {name: 'SQL'},
    {name: 'C++'},
    {name: 'PHP'},
  ];

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private fileService: FileService,
    private emailService: EmailService
  ){}

  ngOnInit(): void {
      this.user = JSON.parse(sessionStorage.getItem('currUser'));
  }

  addQuestion(){
    this.question.datetime = new Date();
    this.question.qcreated_by = this.user.id;
    this.question.category = this.selectedCategory;
    this.question.image_src = this.fileName;
    console.log(this.question);
    this.questionService.createQuestion(this.question).subscribe({
      next: data => {
        console.log(data);
        this.sendEmail();
        this.questionService.setCurrentQuestion(data);
        console.log( `submitted ${this.question.qcreated_by}`);
        this.router.navigateByUrl(`question/detail`);
      },
      error: error => console.log(error)
    })
  }

  onSubmit(){
    this.submitted = true;
    this.addQuestion();

    if (this.selectedFiles) {
      const file: File = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.fileService.uploadImage(this.currentFile).subscribe({
          next: data => {
            console.log(data);
          },
          error: error => console.log(error)
        });
      }

      this.selectedFiles = undefined;
    }
  }

  sendEmail() {
   this.email.subject = 'New Question Ready For Approval';
   this.email.message =  'Please login and head to the admin dashboard to approve or deny this question.';

   console.log(`Email: ` + JSON.stringify(this.email));
   this.emailService.sendEmail(this.email).subscribe({
    next: data => console.log(data),
    error: error => console.log(error)
   })
  }

  onFileChange(event: any){
    console.log('HELLO');
    this.selectedFiles = event.target.files;
    this.fileName = this.selectedFiles.item(0).name;
  }

}

interface Category{
    name: string;
}