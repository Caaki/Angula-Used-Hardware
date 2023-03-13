import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { User } from 'src/app/models/user-model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  json_location= 'http://localhost:3000/users';

  constructor(private _httpClient:HttpClient,private routes: Router) { }

  private _createUserFromObject(item: any){
    return new User (item.id, item.username, item.password, item.mobile, item.town);
  }


  public getNextId(){
    let max = 0;
    this.getAllUsers().subscribe(users =>{
      users.forEach(curent =>{
        if(curent.id > max){
          max=curent.id;
        }
      });
      return max+1;
    });
   return max;
  }


 public getUserByCredentials(username: string, password: string): Observable<User> {
  return this._httpClient.get<User[]>(`${this.json_location}?username=${username}&password=${password}`)
    .pipe(
      map((users: User[]) => {
        return users.find(user => user.username === username && user.password === password);
      }),
      map(item => this._createUserFromObject(item))
    );
}


  public addUser(username:string, password:string,mobile:string,town:string){
    let toAdd = new User(this.getNextId(),username,password,mobile,town);
    this._httpClient.post(this.json_location, toAdd).subscribe(
    (data: any) => {
    this._createUserFromObject(data)
    }
    );
    
    this.routes.navigate(['/login']);
    }
  

  private getAllUsers(): Observable<User[]>{
    return this._httpClient.get<User[]>(this.json_location).pipe(
    map((items:any ) => items.map((item: any)=> this._createUserFromObject(item)))
    )
    }
    
    

}