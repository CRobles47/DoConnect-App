import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Answer } from './answer';
import { BehaviorSubject, Observable } from 'rxjs';

const ANS_KEY = 'currAnswers';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private answer$ = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem(ANS_KEY)));
  currentAnswers$ = this.answer$.asObservable();
  baseUrl = "http://localhost:8080/api/answer"

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Answer[]>{
    return this.httpClient.get<Answer[]>(`${this.baseUrl}/getall`);
  }

  getAnswerById(id: number): Observable<Answer>{
    return this.httpClient.get<Answer>(`${this.baseUrl}/${id}`);
  }

  getAnswersByQuestionId(id: number): Observable<Answer[]>{
    return this.httpClient.get<Answer[]>(`${this.baseUrl}/getall/byquestion/${id}`);
  }

  createAnswer(answer: Answer): Observable<Answer>{
    return this.httpClient.post<Answer>(`${this.baseUrl}/add`, answer);
  }

  updateAnswer(id: number, answer: Answer): Observable<Answer>{
    return this.httpClient.put<Answer>(`${this.baseUrl}/update/${id}`, answer);
  }

  deleteAnswer(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/delete/${id}`);
  }

  setCurrAnswerList(answers: Answer[]){
    this.answer$.next(answers);
    sessionStorage.setItem(ANS_KEY, JSON.stringify(answers));
  }

}

/*
export const answerResolver: ResolveFn<Answer[]> = (
  route: ActivatedRouteSnapshot,
   state: RouterStateSnapshot
) => {
  return inject(AnswerService).getAnswersByQuestionId(route.params.id);
}; 

*/
