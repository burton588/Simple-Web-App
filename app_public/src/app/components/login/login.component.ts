import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SimpleWebAppDataServiceService } from 'src/app/services/simple-web-app-data-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
    private simpleWebAppServiceService: SimpleWebAppDataServiceService,
    private router: Router) { }

  public message = "Please enter your credentials";

  public userLogin = {
    "_id": "",
    "userName": "",
    "password" : ""
  };

  public checkLoginData(): void {
    if(!this.userLogin.userName || !this.userLogin.password){
      this.message = "Please fill both input boxes!";
      return;
    }
    console.log(this.userLogin.userName);
    this.sendLoginData();

  }

  private sendLoginData(): void{
    this.authenticationService
      .login(this.userLogin)
      .pipe(catchError((napaka: HttpErrorResponse) => {
        this.message = napaka.toString();
        return throwError(() => napaka);
      })).subscribe(() => {
       this.router.navigateByUrl("/contacts"); 
        
      });
  }
  


  ngOnInit(): void {
    if(this.authenticationService.isSignedIn()){
      this.router.navigateByUrl("/contacts")
    }
  }

}
