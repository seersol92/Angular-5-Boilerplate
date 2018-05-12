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
import { Observable } from 'rxjs/Observable';
import { matchOtherValidator } from './password-validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  public isFormProcessing: Boolean = false;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      firstName: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('([a-zA-Z0-9]*$)')
        ])
      ],
      lastName: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('([a-zA-Z0-9]*$)')
        ])
      ],
      userName: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('([a-zA-Z0-9_]*$)')
        ]),
        this.checkUserName.bind(this)
      ],
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/
          ),
          Validators.maxLength(30)
        ]),
        this.checkEmail.bind(this)
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          )
        ])
      ],
      passwordConfirm: [
        null,
        Validators.compose([
          Validators.required,
          matchOtherValidator('password')
        ])
      ]
    });
    function passwordMatchValidator(g: FormGroup) {
      return g.get('password').value === g.get('passwordConfirm').value
        ? null
        : { mismatch: true };
    }
  }

  /* @type: Asynchronous
   * Only hit the serve when name is valid do not access for every case :)
   * @Param: username
   * @return: boolean
   */
  checkUserName(c: FormControl): Promise<any> | Observable<any> {
    const username = c.value;
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        this.auth
          .getRequest('/auth/check-user-name/' + username)
          .subscribe(data => {
            if (data.success) {
              resolve({ checkUserName: true });
            }
            resolve(null);
          });
      }, 1500);
    });
    return promise;
  }

  /* @type: Asynchronous
   * Only hit the serve when email is valid do not access for every case :)
   * @Param: email
   * @return: boolean
   */
  checkEmail(c: FormControl): Promise<any> | Observable<any> {
    const email = c.value;
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        this.auth.getRequest('/auth/check-email/' + email).subscribe(data => {
          if (data.success) {
            resolve({ checkEmail: true });
          }
          resolve(null);
        });
      }, 1500);
    });
    return promise;
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const data = this.registerForm.value;
      const newUser = {
        firstname: data.firstName,
        lastname:  data.lastName,
        username:  data.userName,
        email:     data.email,
        password:  data.password,
        is_admin:  false
      };
      this.isFormProcessing = true;
      this.auth.register(newUser).subscribe(
        response => {
          const res = response.json();
          this.toastr.success(
            'Your account has been created!!',
            res.message, {
              timeOut: 2500
            }
          );
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000); // redirect after 3 sec
        },
        err => {
          this.isFormProcessing = false;
          if (err.status !== 0) { // check if there is no server error
            this.toastr.error(err.json().message, 'Error');
          } else {
            this.toastr.info(
              'There is a problem to connect with server, please check your connection!!',
              'Server Error'
            );
          }
        }
      );
    } else {
      this.toastr.error(
        'Form validation is not valid!!',
        'Error'
      );
    }
  }
}
