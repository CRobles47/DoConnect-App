import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';
import { Question } from './question';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit{
  questions!: Question[];
  isSearch: boolean = false;

  constructor(
    private questionService: QuestionService, 
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {

    this.route.paramMap.subscribe({
      next: () => this.populateList(),
      error: error => console.log(error)
    });
      
  }

  goToQuestion(question: Question){
    this.questionService.setCurrentQuestion(question);
    this.router.navigateByUrl(`/question/detail`);
  }

  populateList(){
    this.isSearch = this.route.snapshot.paramMap.has('keyword');

    if(this.isSearch){
      this.getSearchProducts();
    } else {
      this.getAll();
    }
  }

  getSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword');

    if(keyword === ''){
      this.getAll();
    } else {
      this.questionService.getByKeyword(keyword).subscribe({
        next: data => this.questions = data,
        error: error => console.log(error)
      })
    }
  }

  getAll() {
    this.questionService.getAll().subscribe({
      next: data => this.questions = data,
      error: error => console.log(error)
    });
  }


}
