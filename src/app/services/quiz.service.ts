import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from '../model/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  ROOT_URL = 'http://127.0.0.1:8000/api/v1/quizzes';

  constructor(private http: HttpClient) { }

  
  

  store(title: string, description: string) {
    return this.http.post<Quiz>(`${this.ROOT_URL}/create`, { title, description });
  }

  getAll(): Observable<Quiz[]>{
    return this.http.get<Quiz[]>(this.ROOT_URL);
  }

  getQuestionsAndOptions(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.ROOT_URL}/${id}`);
  }

  destroyQuiz(id: number): Observable<{}> {
    return this.http.delete(`${this.ROOT_URL}/${id}`);
  }
}
