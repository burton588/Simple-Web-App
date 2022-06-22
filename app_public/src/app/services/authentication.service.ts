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
 
  /* public getToken(): string {
    return this.storage.getItem('simple-token');
  } */

  public saveToken(token: string): void {
    this.storage.setItem('simple-token', token);
  }

}
