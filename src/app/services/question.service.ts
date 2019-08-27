import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../model/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  ROOT_URL = 'http://127.0.0.1:8000/api/v1/question';

  constructor(private http: HttpClient) { }

  storeWithOptions(data: any) {
    return this.http.post<Question>(`${this.ROOT_URL}/create`, data );
  }
}
