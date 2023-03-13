import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user-model/user';
import { AuthenticationServiceService } from 'src/app/services/Authentication/authentication-service.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  menu:any;
  navbar:any;
  loged = false;
  constructor(private authService:AuthenticationServiceService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.navbar = document.querySelector('.navbar');
    this.menu=document.querySelector('#menu-icon');
    this.menu.onclick =()=>{
      this.menu?.classList.toggle('bx-x');
      this.navbar?.classList.toggle('open');
    }
    this.route.queryParams.subscribe(params => {
      const message = params['message'];
      if (message) {
        setTimeout(() => Swal.fire({
          title: 'Welcome ' + message+"!",
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#018281'
        }
        )
          , 500);
      }
  });


  }

  get user(): User {
    return this.authService.user;
  }

  get isLoggedIn(): boolean {
    
    return this.authService.isLoggedIn;
  }

  logout() {
    this.authService.logout();

}
}
