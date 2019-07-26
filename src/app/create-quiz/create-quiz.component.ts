import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {

  quizForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(private router: Router,
    private fb: FormBuilder,
    private qService: QuizService) { }

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
    //console.log(this.f.title.value, this.f.description.value);
        // stop here if form is invalid
    if (this.quizForm.invalid) {
        return;
    }
    this.loading = true;

    this.qService.store(this.f.title.value, this.f.description.value).subscribe(
      data => {
        this.submitted = true;
        this.loading = false;
        this.quizForm.reset();
      }
    )
  }

  closeAlert() {
    this.submitted = false;
  }

}
