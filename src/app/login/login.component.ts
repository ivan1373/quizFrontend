import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: any;

  constructor(private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    /*private as: AuthService*/) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
      ]],
      password: ['', [
        Validators.required
      ]]
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  toRegister() {
    this.router.navigate(['/register']);
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  loginUser()
  {
        console.log(this.f.email.value, this.f.password.value);
        // stop here if form is invalid
       /* if (this.loginForm.invalid) {
            return;
        }

  
        this.as.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    console.log(error);
                });*/
  }

}
