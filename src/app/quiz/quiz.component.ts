import { Component, OnInit } from '@angular/core';
import { Quiz } from '../model/quiz';
import { QuizService } from '../services/quiz.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddQuestionComponent } from '../add-question/add-question.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  //quizzes: Quiz[] = [];
  dataSource = new MatTableDataSource();

  displayedColumns: string[] = ['id', 'title', 'description', 'question_count', 'action', 'delete'];
  
  constructor(private qService: QuizService, private dialog: MatDialog) {
    
   }

  ngOnInit() {
    this.setQuizzes();
    //this.dataSource.data = this.quizzes;
  }

  setQuizzes() {
    this.qService.getAll().subscribe(
      (data) => {
        this.dataSource.data = data,
        error => console.log(error)
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    //dialogConfig.height = '300px';
    this.dialog.open(AddQuestionComponent, dialogConfig);
}

  

}
