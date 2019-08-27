import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ScoreService } from '../services/score.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.css']
})
export class HighscoresComponent implements OnInit {

  dataSource = new MatTableDataSource();
  quiz_id: number;

  displayedColumns: string[] = ['amount', 'user', 'date'];

  constructor(private sService: ScoreService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.quiz_id = +(this.route.snapshot.paramMap.get('id'));
    this.setScores(this.quiz_id);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toQuizzes() {
    this.router.navigate(['/quiz']);
  }

  setScores(id: number) {
    this.sService.getScores(id).subscribe(
      (data) => {
        this.dataSource.data = data,
        error => console.log(error)
      }
    )
  }

}
