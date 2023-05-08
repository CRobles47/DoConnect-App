import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Question } from './question';

const QUESTION_KEY = "currQuestion";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private question$ = new BehaviorSubject<any>(sessionStorage.getItem(QUESTION_KEY));
  currentQuestion$ = this.question$.asObservable();
  baseUrl = "http://localhost:8080/api/question"

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Question[]>{
    return this.httpClient.get<Question[]>(`${this.baseUrl}/getall`);
  }

  getByQuestionId(id: number): Observable<Question>{
    return this.httpClient.get<Question>(`${this.baseUrl}/${id}`);
  }

  getByCategory(name: string): Observable<Question[]>{
    return this.httpClient.get<Question[]>(`${this.baseUrl}/getall/bycategory/${name}`);
  }

  getByKeyword(keyword: string): Observable<Question[]>{
    return this.httpClient.get<Question[]>(`${this.baseUrl}/getall/bykeyword/${keyword}`);
  }

  createQuestion(question: Object): Observable<Question>{
    return this.httpClient.post<Question>(`${this.baseUrl}/add`, question);
  }

  updateQuestion(id: number, question: Question): Observable<Question>{
    return this.httpClient.put<Question>(`${this.baseUrl}/update/${id}`, question);
  }

  deleteQuestion(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/delete/${id}`);
  }

  setCurrentQuestion(question: any){
    this.question$.next(question);
    sessionStorage.setItem(QUESTION_KEY, JSON.stringify(question));
  }
}
