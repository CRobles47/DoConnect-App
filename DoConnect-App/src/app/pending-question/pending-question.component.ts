import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Question } from '../question-list/question';
import { data } from 'jquery';
import { User } from '../user/user';
import { QuestionService } from '../question-list/question.service';
import { LoginService } from '../login/login.service';
import { error } from 'console';

@Component({
  selector: 'app-pending-question',
  templateUrl: './pending-question.component.html',
  styleUrls: ['./pending-question.component.scss']
})
export class PendingQuestionComponent implements OnInit {
  questions!: Question[];
  user!: User

  constructor(
    private questionService: QuestionService,
    private loginService: LoginService,
  ){}

  ngOnInit(): void {
      this.questionService.getAll().subscribe({
        next: data => this.questions = data,
        error: error => console.log(error)
      })

      this.user = JSON.parse(sessionStorage.getItem('currUser'));
  }

  approve(question: Question){

    question.approved = true;
    question.qapproved_by = this.user.id;
    this.questionService.updateQuestion(question.id, question).subscribe({
      next: data => console.log(data),
      error: error => console.log(error)
    })
  }

  delete(questionToDelete: Question){
    this.questionService.deleteQuestion(questionToDelete.id).subscribe({
      next: data => console.log(data),
      error: error => console.log(error)
    })
    this.questions = this.questions.filter(question => question != questionToDelete)
  }

}
