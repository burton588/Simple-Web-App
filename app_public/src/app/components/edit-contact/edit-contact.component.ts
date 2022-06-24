import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { catchError, throwError } from 'rxjs';
import { Contact } from 'src/app/classes/contact';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SimpleWebAppDataServiceService } from 'src/app/services/simple-web-app-data-service.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
    private simpleWebAppServiceService: SimpleWebAppDataServiceService,
    private router: Router) { }

  public message = "Please edit your contact information!";

  public contact = {
    "_id": "",
    "firstname": "",
    "lastname" : "",
    "phoneNumber": ""
  };

  public phoneNumberRegex = /^\d+$/;
  public checkData(): void {
    if(!this.contact.firstname || !this.contact.lastname || !this.contact.phoneNumber){
      this.message = "Please fill all input boxes!";
      return;
    }
    if(!this.phoneNumberRegex.test(this.contact.phoneNumber)){
      this.message = "Please fill in the form correctly."
    }
    this.sendContactData();

  }

  public getContact(): void{
    const url = this.router.url;
    const tmp = url.split("/");
    this.simpleWebAppServiceService
      .getContact(tmp[tmp.length - 1])
      .pipe(catchError((error: HttpErrorResponse) => {
        this.message = error.toString();
        return throwError(() => error);
      })).subscribe((contact: Contact) => {
        this.contact = contact

      }); 
  }


  private sendContactData(): void{
     this.simpleWebAppServiceService
      .editContact(this.contact)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.message = error.toString();
        return throwError(() => error);
      })).subscribe((contact: Contact) => {
        this.message = "Successfully edited contact!"
        var elem: HTMLElement = document.getElementById('message')!;
        elem.setAttribute("style", "color: green")
        setTimeout(() => {
          this.router.navigateByUrl("contacts")
        },
        3000);

      }); 
  }

  public deleteContact(): void{
    this.simpleWebAppServiceService
      .deleteContact(this.contact)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.message = error.toString();
        return throwError(() => error);
      })).subscribe((contact: Contact) => {
        this.message = "Successfully deleted contact!"
        var elem: HTMLElement = document.getElementById('message')!;
        elem.setAttribute("style", "color: green")
        setTimeout(() => {
          this.router.navigateByUrl("contacts")
        },
        3000);

      }); 
  }


  ngOnInit(): void {
    this.getContact();
  }

}
