import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../question-list/question';
import { AnswerService } from '../answer/answer.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { Answer } from '../answer/answer';
import { QuestionService } from '../question-list/question.service';
import { data } from 'jquery';
import { FileService } from '../file/file.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.scss']
})
export class AnswerListComponent implements OnInit{
  question: Question;
  user: User;
  answers: Answer[];
  answersDisplay: Answer[];

  constructor(
    private answerService: AnswerService,
    private userService: UserService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.getAnswers();
    this.getUsernames();
  }

  getAnswers(){
    this.answerService.currentAnswers$.subscribe({
      next: data => { 
        this.answers = data;
        console.log(this.answers);
        this.answersDisplay = this.answers;
        this.answers.map( (answer, index) => {

          if(answer.approved == true && (answer.img_src != null && answer.img_src !== '')) {
            console.log(answer.img_src);
            this.fileService.getImage(answer.img_src).subscribe({
              next: data => {
                URL.revokeObjectURL(this.answersDisplay[index].img_src);
                this.answersDisplay[index].img_src = URL.createObjectURL(data);
                console.log("LINK ----- " + answer.img_src);
              }
            });
          }

        });
      }
    });
  }

  getUsernames(){
    this.answersDisplay.map( answer => {
      this.userService.getUser(+answer.created_by).subscribe({
        next: data => {
          answer.created_by = data.username;
        }
      })
    })

    console.log(this.answersDisplay);
  }

}
