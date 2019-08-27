import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  error = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private as: AuthService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    });
  }

  toLogin() {
    this.router.navigate(['/login']);
  }

  get f() { return this.registerForm.controls; }

  registerUser() {
    console.log(this.registerForm.value);
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    	}

    this.as.register(this.registerForm.value)
      .subscribe(
          data => {
              //this.alertService.success('Registration successful', true);
              this.error = false;
              this.router.navigate(['/login']);
          },
          error => {
              //this.alertService.error(error);
              this.error = true;
          });
  }

}
