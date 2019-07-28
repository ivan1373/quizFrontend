import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  selectedNumOfOptions: number = 0;
  options: string[] = ['2','3','4'];

  constructor() { }

  ngOnInit() {
  }

}
