import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: any;

  error = false;

  constructor(private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private as: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required
      ]]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  toRegister() {
    this.router.navigate(['/register']);
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  loginUser()
  {
        console.log(this.f.email.value);
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

  
        this.as.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                  this.error = false;
                  this.router.navigate([this.returnUrl]);
                },
                error => {
                  //console.log(error);
                  this.error = true;
                });
  }

}
