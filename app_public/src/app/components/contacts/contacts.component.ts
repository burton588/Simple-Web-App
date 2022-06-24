import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { Contact } from 'src/app/classes/contact';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SimpleWebAppDataServiceService } from 'src/app/services/simple-web-app-data-service.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(private simpleWebAppDataService: SimpleWebAppDataServiceService,
    private authService: AuthenticationService, private router: Router
    ) { }

  public contacts: Contact[] = []

  public message: String = "Please wait for data to load...";

  private getContacts(): void{
    this.simpleWebAppDataService.getContactsForUser()
    .pipe(catchError((napaka: HttpErrorResponse) => {
      this.message = napaka.toString();
      return throwError(() => napaka);
    })).subscribe((data) => {
      this.contacts = data;
    });
    
  }

  public signOut(): void{
    this.authService.signOut();
    this.router.navigateByUrl("/")

  }

  ngOnInit(): void {
    if(this.authService.isSignedIn()){
      this.getContacts();
    }
    else{
      this.router.navigateByUrl("/")
    }
    }

}
