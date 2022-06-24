import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Contact } from 'src/app/classes/contact';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SimpleWebAppDataServiceService } from 'src/app/services/simple-web-app-data-service.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
    private simpleWebAppServiceService: SimpleWebAppDataServiceService,
    private router: Router) { }

  public message = "Please enter your contact information!";

  public contactNew = {
    "_id": "",
    "firstname": "",
    "lastname" : "",
    "phoneNumber": ""
  };

  public  phoneNumberRegex =  new RegExp('^[0-9]+$');

  public checkData(): void {
    if(!this.contactNew.firstname || !this.contactNew.lastname || !this.contactNew.phoneNumber){
      this.message = "Please fill all input boxes!";
      return;
    }
    else if(!this.phoneNumberRegex.test(this.contactNew.phoneNumber)){
      this.message = "Please fill in the form correctly."
    }
    else{
    this.sendContactData();
    }
  }

  private sendContactData(): void{
     this.simpleWebAppServiceService
      .addNewContact(this.contactNew)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.message = error.toString();
        return throwError(() => error);
      })).subscribe((contact: Contact) => {
        this.message = "Successfully added new contact!"
        var elem: HTMLElement = document.getElementById('message')!;
        elem.setAttribute("style", "color: green")
        setTimeout(() => {
          this.router.navigateByUrl("contacts")
        },
        2000);

        
      }); 
  }


  ngOnInit(): void {
  }

}
