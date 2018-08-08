import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers} from '@angular/http';


@Injectable()
export class UserService {

  constructor(
    private authService:AuthService,
    private http:Http
  ) { }

  getCurrentUser(){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/users/profile');
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

  getUsersByRole(r){
    let role = {role: r}
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/users/find-by-role');
    return this.http.post(ep, role, {headers: headers})
      .map((res) => res.json())
  }

}
