import { Component, OnInit } from '@angular/core';
import { Question } from '../question-list/question';
import { User } from '../user/user';
import { Answer } from '../answer/answer';
import { AnswerService } from '../answer/answer.service';
import { FileService } from '../file/file.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.scss']
})
export class QuestionDetailComponent implements OnInit {
  question!: Question;
  user!: User;
  answers: Answer[];
  answerClicked: boolean = false;
  imageUrl: string;

  constructor(
    private answerService: AnswerService,
    private fileService: FileService,
    private route: ActivatedRoute,
    private userService: UserService
  ){
    this.user = new User('','');
  }

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails(){
    this.getQuestion();
    this.checkForImage();
    this.getAnswers();
  }

  getQuestion() {
    this.question = JSON.parse(sessionStorage.getItem('currQuestion'));

    this.userService.getUser(this.question.qcreated_by).subscribe({
      next: data => this.user = data
    })
  }

  checkForImage(){
    if(this.question.image_src != null){
      this.fileService.getImage(this.question.image_src).subscribe({
        next: data => this.imageUrl = URL.createObjectURL(data)
      })
    }
  }

  getAnswers(){
    let tempAnswers: Answer[];

    this.answerService.getAnswersByQuestionId(this.question.id).subscribe({
      next: data => {
        tempAnswers = data;
        this.answerService.setCurrAnswerList(tempAnswers);
        this.answers = data;
        console.log(data);
      },
      error: error => console.log(error)
    });

    let hasApproved: boolean = false;

    if(tempAnswers) {
      console.log('IF ---- ' + tempAnswers)
      tempAnswers = tempAnswers.filter( answer => {
        answer.approved == false;
      })

      this.answers = tempAnswers;
    } else {
      this.answers = null;
    }

  }

  answer(){
    this.answerClicked = true
  }

  postSubmitted(submitted: boolean){
    console.log(submitted);
    this.answerClicked = submitted;
  }

}