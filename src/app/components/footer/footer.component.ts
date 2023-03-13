import { Component, OnInit } from '@angular/core';
import { AuthenticationServiceService } from 'src/app/services/Authentication/authentication-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private authService:AuthenticationServiceService) { }

  ngOnInit(): void {
  }

  logout() {
    if(!this.authService.isLoggedIn){
      window.open("https://pics.me.me/logout-failed-you-need-to-be-logged-in-to-log-32064581.png");
    }else{
    this.authService.logout();
    }
}

public openNewTab(){
  window.open("https://www.youtube.com/watch?v=0pc5Hd8UM9c");
}

public openMeme(){
  window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
}

public HEYYEYAAEYAAAEYAEYAA(){
  window.open("https://www.youtube.com/watch?v=ZZ5LpwO-An4&t=14s");
}

public caki(){
  window.open("https://i.redd.it/25l008q1wwo71.png");
}

}
