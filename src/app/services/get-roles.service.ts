import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {Http, Headers} from '@angular/http';


@Injectable()
export class GetRolesService {
  roles:Array<string>;
  user:any;

  constructor(
    private authService:AuthService,
    private http:Http
  ) { }

//defines roles in the service based on current user's id
  setRoles(){
    this.getProfile().subscribe(profile => {
      this.user = profile.user;
      this.getRoles(profile.user._id).subscribe(data => {
        this.roles = data;

      },
      err => {
        console.log(err);
        return false
      });

    },
    err => {
      console.log(err);
      return false;
    });


  }

//sends request to api to retrieve roles for the specified user id
  getRoles(id){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/users/get-roles/' + id);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json())
  }

  //checks if user has a specified role; returns true if they do, false if they don't
  checkRole(role){
      if(this.roles){
        if(this.roles.indexOf(role) > -1){
          return true
        }

      } else {
        return false
      }

  }

  //requests user info from the api
    getProfile(){
        let headers = this.authService.setHeaders();
        let ep = this.authService.prepEndpoint('http://localhost:3000/users/profile');
        return this.http.get(ep,{headers: headers})
          .map(res => res.json());

    }

}
