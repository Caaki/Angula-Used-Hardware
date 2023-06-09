import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { User } from 'src/app/models/user-model/user';
import { AuthenticationServiceService } from 'src/app/services/Authentication/authentication-service.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userForm!:FormGroup;



  constructor(private authService:AuthenticationServiceService ,private _userService: UserService,private router: Router) {
    this.initForms();
   }

  ngOnInit(): void {
   
  }

  public initForms(){
    this.userForm = new FormGroup({
      username: new FormControl('',[
        Validators.required,Validators.minLength(3)
      ]),
      password: new FormControl('',[
        Validators.required,Validators.minLength(4)
      ])

    })
  }

  public submitForm(){

    if(!this.userForm.valid){
      if(!this.userForm.controls["username"].valid){
        Swal.fire({
          title: 'Error!',
          text: "Username must have at least 3 caracters",
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#018281'
        }
        );
      }else if(!this.userForm.controls["password"].valid){
        Swal.fire({
          title: 'Error!',
          text: "Password must contain at least 4 caracters",
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#018281'
        }
        );
      }
    }else{

    let username = this.userForm.get('username')!.value;
    let password = this.userForm.get('password')!.value;

    this._userService.getUserByCredentials(username,password)
    .pipe(catchError(err => {
      Swal.fire({
        title: 'Error!',
        text: "Wrong password or username!!!",
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#018281'
      }
      )
        return of(null);
    }))
    .subscribe((data)=>{
        if (data) {
            this.authService.login(data);
            this.router.navigate(['/'], { queryParams: { message: data.username } });
        }
    }); 
  }
  }


}
