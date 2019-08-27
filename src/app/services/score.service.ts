import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Score } from '../model/score';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  ROOT_URL = 'http://127.0.0.1:8000/api/v1/score';

  constructor(private http: HttpClient) { }

  storeScore(amount: number, quiz_id: number) {
    return this.http.post<Score>(`${this.ROOT_URL}/create`, { amount, quiz_id });
  }

  getScores(quiz_id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.ROOT_URL}/${quiz_id}`);
  }
}
