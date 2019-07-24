import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {

  quizForm: FormGroup;

  constructor(private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.quizForm = this.fb.group({
      title: ['', [
        Validators.required,
      ]],
      description: ['', [
        Validators.required
      ]]
    })
  }

  toQuizzes() {
    this.router.navigate(['/quiz']);
  }

  get f() { return this.quizForm.controls; }

  addQuiz() {
    console.log(this.f.title.value, this.f.description.value);
        // stop here if form is invalid
        if (this.quizForm.invalid) {
            return;
        }
  }

}
