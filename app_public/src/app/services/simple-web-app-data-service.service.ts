import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BROWSER_STORAGE } from '../classes/storage';
import { User } from '../classes/user';
import { AuthResult } from '../classes/auth-result';
import { Observable, ObservableLike } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Contact } from '../classes/contact';

@Injectable({
  providedIn: 'root'
})
export class SimpleWebAppDataServiceService {

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage,
  private http: HttpClient) { }

  private apiUrl = "http://localhost:3000/api";


  private handleError(error1: any): Promise<any> {
    console.log('There was an error', error1.error["message"] || error1.error.errmsg || error1);
    return Promise.reject(error1.error["message"]|| error1.error.errmsg || error1);
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
    .pipe(retry(1), catchError(this.handleError))
  };

  public getContactsForUser(): Observable<Contact[]> {
    const url: string = `${this.apiUrl}/contacts`;
    const httpHeader = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('simple-token')}`
      })
    };
    return this.http
      .get<Contact[]>(url, httpHeader)
      .pipe(retry(1), catchError(this.handleError))
  }


  public addNewContact(contact: Contact): Observable<Contact> {
    const url: string = `${this.apiUrl}/contacts`;
    const httpHeader = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('simple-token')}`
      })
    };
    return this.http
    .post<Contact>(url, contact, httpHeader)
    .pipe(retry(1), catchError(this.handleError))
  };

  public getContact(_id: string): Observable<Contact> {
    const url: string = `${this.apiUrl}/contacts/${_id}` ;
    const httpHeader = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('simple-token')}`
      })
    };
    return this.http
      .get<Contact>(url, httpHeader)
      .pipe(retry(1), catchError(this.handleError))

  }

  public editContact(contact: Contact): Observable<Contact> {
    const url: string = `${this.apiUrl}/contacts/${contact._id}`;
    const httpHeader = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('simple-token')}`
      })
    };
    return this.http
    .put<Contact>(url, contact, httpHeader)
    .pipe(retry(1), catchError(this.handleError))
  };

  public deleteContact(contact: Contact): Observable<Contact> {
    const url: string = `${this.apiUrl}/contacts/${contact._id}`;
    const httpHeader = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('simple-token')}`
      })
    };
    return this.http
    .delete<Contact>(url, httpHeader)
    .pipe(retry(1), catchError(this.handleError))
  };


}
