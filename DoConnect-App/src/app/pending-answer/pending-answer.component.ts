import { Component, OnInit } from '@angular/core';
import { Answer } from '../answer/answer';
import { AnswerService } from '../answer/answer.service';
import { LoginService } from '../login/login.service';
import { User } from '../user/user';
import { error } from 'console';

@Component({
  selector: 'app-pending-answer',
  templateUrl: './pending-answer.component.html',
  styleUrls: ['./pending-answer.component.scss']
})
export class PendingAnswerComponent implements OnInit {
  answers!: Answer[];
  user!: User;

  constructor(
    private answerService: AnswerService,
    private loginService: LoginService
  ){}

  ngOnInit(): void {
      this.answerService.getAll().subscribe({
        next: data => this.answers = data,
        error: error => console.log(error)
      })

      this.user = JSON.parse(sessionStorage.getItem('currUser'));
  }

  approve(answer: Answer){
  
    answer.approved = true;
    answer.approved_by = String(this.user.id);
    this.answerService.updateAnswer(answer.id, answer).subscribe({
      next: data => console.log(data),
      error: error => console.log(error)
    })
  }

  delete(answerToDelete: Answer){
    this.answerService.deleteAnswer(answerToDelete.id).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => console.log(error)
    })

    this.answers = this.answers.filter(answer => answer != answerToDelete);
  }

}
