import { isNull } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user-model/user';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService implements CanActivate {

  
  user: User;
  isLoggedIn = false;

  constructor(private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if(!this.isLoggedIn){
      return this.router.navigate(['/login']);
    }else{
      return true;
    }
  }

  login(user:User) {
    this.user = user;
    this.isLoggedIn = true;

  }

  logout() {
    this.isLoggedIn = false;
    this.user = ({id:0,username: "",
      password:"",
      mobile: "",
      town:""});
      this.router.navigate(['/']);
}
}


