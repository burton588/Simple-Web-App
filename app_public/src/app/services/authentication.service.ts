import { Injectable, Inject } from '@angular/core';
import { BROWSER_STORAGE } from '../classes/storage';
import { User } from '../classes/user';
import { SimpleWebAppDataServiceService } from './simple-web-app-data-service.service';
import { AuthResult } from '../classes/auth-result';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage,
  private simpleWebAppDataService: SimpleWebAppDataServiceService) { }

  public login(user: User): Observable<AuthResult> {
    console.log(user);
    return this.simpleWebAppDataService
      .login(user)
      .pipe(
        tap((AuthResult: AuthResult) => {
      
        this.saveToken(AuthResult["token"])
      }))
  }

  public register(user: User): Observable<AuthResult> {
    return this.simpleWebAppDataService
      .register(user)
      .pipe(
        tap((AuthResult: AuthResult) => {
        this.saveToken(AuthResult["token"])
      }))
  }
 

  public saveToken(token: string): void {
    this.storage.setItem('simple-token', token);
  }

  public signOut(): void {
    this.storage.removeItem('simple-token');
  }

  public getToken() {
    return this.storage.getItem('simple-token');
  }

  public isSignedIn(): boolean {
    const token = this.getToken();
    if (token) {
      const value = JSON.parse(atob(token.split('.')[1]));
      return value.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  public getCurrentUser(): any {
    if (this.isSignedIn()) {
      const token = this.getToken()!;
      const {_id, userName } = JSON.parse(atob(token.split('.')[1]));
      return { _id, userName} as User;
    }
  }

}
