import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Answer } from './answer';
import { User } from '../user/user';
import { AnswerService } from './answer.service';
import { Question } from '../question-list/question';
import { FileService } from '../file/file.service';
import { Email } from '../email/email';
import { EmailService } from '../email/email.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit{
  answer: Answer;
  question: Question;
  user: User;
  answerList: Answer[];
  currentFile: File;
  selectedFiles: FileList;
  fileName: string='';
  email = new Email('','');
  @Output() submitted = new EventEmitter<boolean>();

  constructor(
    private answerService: AnswerService,
    private fileService: FileService,
    private emailService: EmailService
  ){}


  ngOnInit(): void {
      this.user = JSON.parse(sessionStorage.getItem('currUser'));
      this.question = JSON.parse(sessionStorage.getItem('currQuestion'));
      this.answer = new Answer(0,'','',false,new Date(),'','',this.question);
      this.answerService.currentAnswers$.subscribe({
        next: data => {
          this.answerList = data;
        }
      })
  }

  addAnswer(){
    this.answer.created_by = String(this.user.id);
    this.answer.img_src = this.fileName;
    this.answerService.createAnswer(this.answer).subscribe({
      next: data => {
        console.log(data);
      },
      error: data => {
        console.log(data);
      }
    })
    this.answerList.push(this.answer);
    console.log(this.answerList);
    this.answerService.setCurrAnswerList(this.answerList);
  }

  onSubmit(){
    this.addAnswer();
    this.submitted.emit(false);

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

    this.sendEmail();
  }

  onFileChange(event: any){
    console.log('HELLO');
    this.selectedFiles = event.target.files;
    this.fileName = this.selectedFiles.item(0).name;
  }

  sendEmail() {
    this.email.subject = 'New Answer Ready For Approval';
    this.email.message =  'Please login and head to the admin dashboard to approve or deny this answer.';
 
    console.log(`Email: ` + JSON.stringify(this.email));
    this.emailService.sendEmail(this.email).subscribe({
     next: data => console.log(data),
     error: error => console.log(error)
    })
   }

}
