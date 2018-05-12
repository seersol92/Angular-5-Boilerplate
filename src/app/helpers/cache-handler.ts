import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CacheHandler {
  public getCurrentUserToken() {
    return window.localStorage.getItem('currentUserToken');
  }

  public setCurrentUserToken(userToken: string) {
    window.localStorage.setItem('currentUserToken', userToken);
  }

  public setCurrentUser(user: string) {
    window.localStorage.setItem('currentUser', user);
  }

  public getCurrentUser() {
    return window.localStorage.getItem('currentUser');
  }
  public clearCache() {
    window.localStorage.clear();
  }
}
