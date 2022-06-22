import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BROWSER_STORAGE } from '../classes/storage';
import { User } from '../classes/user';
import { AuthResult } from '../classes/auth-result';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SimpleWebAppDataServiceService {

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage,
  private http: HttpClient) { }

  private apiUrl = "http://localhost:3000/api";


  private obdelajNapako(napaka: any): Promise<any> {
    console.log('There was an error', napaka.error["message"] || napaka.error.errmsg || napaka);
    return Promise.reject(napaka.error["message"]|| napaka.error.errmsg || napaka);
  }

  public login(user: User): Observable<AuthResult> {
    return this.authentication('login', user);
  }

  public register(user: User): Observable<AuthResult> {
    return this.authentication('register', user);
  } 

  private authentication(url1: string, user: User): Observable<AuthResult> {
    const url: string = `${this.apiUrl}/${url1}`;
    console.log(url);
    return this.http
    .post<AuthResult>(url, user)
    .pipe(retry(1), catchError(this.obdelajNapako))
  };

}
