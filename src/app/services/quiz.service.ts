import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  ROOT_URL = 'http://127.0.0.1:8000/api/v1/quizzes';

  constructor(private http: HttpClient) { }

  
  

  /*store(title: string, content: string) {
    return this.http.post<Note>(`${this.ROOT_URL}/create`, { title, content });
  }

  getAll(): Observable<Note>{
    return this.http.get<Note>(this.ROOT_URL);
  }

  updateNote (title: string, content: string, id: number): Observable<Note> {
    return this.http.put<Note>(`${this.ROOT_URL}/${id}/edit`, { title, content })
      .pipe(
        
      );
  }

  show(id: number) {
    return this.http.get<Note>(`${this.ROOT_URL}/${id}`);
  }

  destroyNote(id: number): Observable<{}> {
    return this.http.delete(`${this.ROOT_URL}/${id}`);
  }*/
}