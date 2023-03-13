import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


interface AppState{
  message: string;
}

@Component({
  selector: 'app-ngrx-prba',
  templateUrl: './ngrx-prba.component.html',
  styleUrls: ['./ngrx-prba.component.scss']
})
export class NgrxPrbaComponent implements OnInit {

  message$: Observable<string>

  constructor(private store: Store<AppState>) {
    this.message$ = this.store.select("message");
   }

  ngOnInit(): void {
  }

  spanishMessage(){
    this.store.dispatch({type: "SPANISH"});
  }

  frenchMessage(){
    this.store.dispatch({type: "FRANCE"});
  }

  showMessage(){
    return this.message$.subscribe((data: string)=>{
      return data;
    })
  }


}
