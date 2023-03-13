import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User } from 'src/app/models/user-model/user';
import { UserService } from 'src/app/services/user-service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(private _userService: UserService) { 
    this.initForms();
  }

  ngOnInit(): void {
  }

  public MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const sourceValue = control.get(source);
      const targetValue = control.get(target);

      if (sourceValue !== targetValue) {
        
        return { mismatch: true };
    } else {
        return null;
    }
};
  }


  public initForms(){
    this.registerForm = new FormGroup({
      username: new FormControl('',[
        Validators.required, Validators.minLength(3)
      ]),
      password: new FormControl('',[
        Validators.required, Validators.minLength(4)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required
      ]),
      mobile: new FormControl('',[
        Validators.required, Validators.minLength(9), Validators.maxLength(14)
      ]),
      town: new FormControl('',[
        Validators.required
      ])
    }, [this.MatchValidator('password', 'confirmPassword')]);
  }

  public submitForm(){
    if(!this.registerForm.valid){
    if(!this.registerForm.controls["username"].valid){
      Swal.fire({
        title: 'Error!',
        text: "Username must have at least 3 caracters!!!",
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#018281'
      });

      
    }else if (!this.registerForm.controls["password"].valid){
      Swal.fire({
        title: 'Error!',
        text: "Password musst contain at least 4 caracters!!!",
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#018281'
      });
    }else if(!this.registerForm.controls["confirmPassword"].valid){
      Swal.fire({
        title: 'Error!',
        text: "Passwords must match!!!",
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#018281'
      });
    }else if(!this.registerForm.controls["mobile"].valid){
      Swal.fire({
        title: 'Error!',
        text: "Enter a valid phone number!!!",
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#018281'
      });
    }else if(!this.registerForm.controls["town"].valid){
      Swal.fire({
        title: 'Error!',
        text: "Enter a valid town!!!",
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#018281'
      });
    }else{
      Swal.fire({
        title: 'Error!',
        text: "Passwords must match!!!",
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#018281'
      });
    }
  }
  
  else{
      

    let username = this.registerForm.get("username")!.value;
    let password = this.registerForm.get("password")!.value;
    let mobile = this.registerForm.get("mobile")!.value;
    let town = this.registerForm.get("town")!.value;


    this._userService.addUser(username,password,mobile,town);
  }  
}

}
