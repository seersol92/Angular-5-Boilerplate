import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Http, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { CacheHandler } from '../helpers/cache-handler';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {
  public accessToken: string = null; // variable to store the access token
  private headers = new Headers(); // headers for each request
  private options = new RequestOptions({ headers: this.headers });
  private cacheHandler: CacheHandler = new CacheHandler();

  constructor(
    private http: Http,
    private router: Router,
    private httpClient: HttpClient
  ) {
    // all headers for JSON requests
    this.headers.append('Content-Type', 'application/json');
  }

  login(user) {
    return this.http
      .post(environment.apiUrl + '/auth/login', user, this.options)
      .map(response => response)
      .catch(err => Observable.throw(err));
  }

  register(user) {
    return this.http
    .post(environment.apiUrl + '/auth/register', user, this.options)
    .map(response => response)
    .catch(err => Observable.throw(err));
  }

  logout() {
    this.accessToken = null;
    this.cacheHandler.clearCache();
  }

  setToken(token) {
    this.cacheHandler.setCurrentUserToken(token);
    this.headers.append('Authorization', 'Bearer ' + token); // add the Authentication header
    this.accessToken = token; // save the access_token
  }

  setUser(user) {
    this.cacheHandler.setCurrentUser(JSON.stringify(user));
  }

  getToken() {
    return this.cacheHandler.getCurrentUserToken();
  }

  getUser() {
    return JSON.parse(this.cacheHandler.getCurrentUser());
  }

  getUserInfo() {
    if (this.cacheHandler.getCurrentUserToken() != null) {
      return this.cacheHandler.getCurrentUser();
    } else {
      this.router.navigate(['/login']);
    }
  }

   isAuthenticated() {
    if (this.getToken() != null) {
      this.setToken(this.getToken());
       this.getRequest('/auth/profile').subscribe(
        res => {
          if (res.user) {
            return true;
          }
        }
      );
    } else {
    this.router.navigate(['/login']);
    return false;
    }
  }

  getRequest(url) {
    return this.http.get(environment.apiUrl + url, this.options)
    .map(res => res.json())
    .catch(this.handleError);
  }

  handleError (error: Response | any) {
    if (error.status === 0 ) {  // catch server error
      console.log('server error');
    } else {
      return Observable.throw(error);
    }
  }
}
