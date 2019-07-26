import { Component, OnInit } from '@angular/core';
import { Quiz } from '../model/quiz';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  quizzes: Quiz[] = [];
  constructor(private qService: QuizService) {
    
   }

  ngOnInit() {
    this.setQuizzes();
  }

  setQuizzes() {
    this.qService.getAll().subscribe(
      (data) => {
        this.quizzes = data,
        error => console.log(error)
      }
    )
  }

}
