import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public isFormProcessing: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      user: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const user = this.loginForm.value;
      this.isFormProcessing = true;
      this.auth.login(user).subscribe(
        response => {
          const res = response.json();
          this.toastr.success(
            'Welcome, redirecting to dashboard..',
            res.message, {
              timeOut: 2500
            }
          );
          this.auth.setToken(res.token);
          this.auth.setUser(res.data);
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 3000); // redirect after 3 sec
        },
        err => {
          this.isFormProcessing = false;
          if (err.status === 401) {
            this.toastr.error(err.json().message, 'Error');
          } else {
            this.toastr.info(
              'There is a problem to connect with server, please check your connection!!',
              'Server Connection Error'
            );
          }
        }
      );
    }
  }
}
