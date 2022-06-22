import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SimpleWebAppDataServiceService } from 'src/app/services/simple-web-app-data-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
    private simpleWebAppServiceService: SimpleWebAppDataServiceService,
    private router: Router) { }

  public message = "Please enter your credentials to create account!";

  public userRegister = {
    "_id": "",
    "userName": "",
    "password" : ""
  };

  public checkRegisterData(): void {
    if(!this.userRegister.userName || !this.userRegister.password){
      this.message = "Please fill all input boxes!";
      return;
    }
    this.sendRegisterData();

  }

  private sendRegisterData(): void{
    this.authenticationService
      .register(this.userRegister)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.message = error.toString();
        return throwError(() => error);
      })).subscribe(() => {
        this.router.navigateByUrl("/");
      });
  }

  ngOnInit(): void {
  }


}
