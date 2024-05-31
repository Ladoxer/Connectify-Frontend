import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(data: User) {
   return this.http.post('http://localhost:3000/login',data)
  }
  findUser(){
    return this.http.get('http://localhost:3000/user')
  }
  getNewMessage(id:string){
    console.log(id);
    
   return this.http.get((`http://localhost:3000/user_chat?id=${id}`))
  }
}
