import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {
  public userInfo: any = null;
  public canActiveUser: boolean;
  api: String = environment.apiUrl;
  options;
  constructor(
    private http: Http,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    const accessToken = this.auth.getToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      })
    });
    // this.getUserInfo();
  }

  async getUserInfo() {
    await this.getRequest('/auth/profile').subscribe(
      res => {
        this.userInfo = res.user;
      }
    );
  }

  postRequest(url, data) {
    return this.http
      .post(this.api + url, data, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  getRequest(url) {
    return this.http
      .get(this.api + url, this.options)
      .map(res => res.json())
      .catch(err => {
        return this.handleError(err);
      });
  }

  updateRequest(url, data) {
    return this.http
      .put(this.api + url, data, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  isAuthenticated() {
    if (this.auth.getToken() != null) {
     return this.getRequest('/auth/profile').map(
        res => {
          return true
        });
    } else {
    this.router.navigate(['/login']);
    return false;
    }
  }

  deleteRequest(url) {
    return this.http
      .delete(this.api + url, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
  public handleError(error: Response | any) {
    if (error.status === 0) {
      window.localStorage.clear();
      // catch server error
      this.toastr.info(
        'There is a problem to connect with server, please check your connection!!',
        'Server Connection Error',
        {
          timeOut: 2500
        }
      );
      this.router.navigate(['/login']);
    } else if (error.status === 401) {
      window.localStorage.clear();
      // Authentication failed e.g 1=> no token found, 2 => token verification failed 3=> token expired
      this.toastr.error(error.json().message, error.json().title, {
        timeOut: 2500
      });
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000); // redirect after 3 sec
    } else {
      return Observable.throw(error);
    }
  }
}
