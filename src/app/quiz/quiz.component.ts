import { Component, OnInit } from '@angular/core';
import { Quiz } from '../model/quiz';
import { QuizService } from '../services/quiz.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AddQuestionComponent } from '../add-question/add-question.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  //quizzes: Quiz[] = [];
  dataSource = new MatTableDataSource();

  //dialogRef: MatDialogRef;

  displayedColumns: string[] = ['id', 'title', 'description', 'question_count', 'action', 'delete'];
  
  constructor(private qService: QuizService, private dialog: MatDialog, private _snackBar: MatSnackBar) {
    
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

  deleteQuiz(id:number){
    this.qService.destroyQuiz(id).subscribe(
      data => {
        this.setQuizzes();
      }
    );
  }

  onDelete(event: Event, id: number){
    event.preventDefault();
    event.stopImmediatePropagation();
    this.deleteQuiz(id);
    this._snackBar.open('Quiz deleted successfully!','',{
      duration: 2000
    });
  }

  openDialog(id: number) {

    const dialogConfig = new MatDialogConfig();

    //dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '500px';
    //dialogConfig.height = '300px';
    dialogConfig.data = {
      quiz_id: id
    };
    let dialogRef = this.dialog.open(AddQuestionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.setQuizzes(); 
    });
}

  

}
