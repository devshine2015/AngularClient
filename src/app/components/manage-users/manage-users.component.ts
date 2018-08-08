import { Component, OnInit } from '@angular/core';
import {OrderByPipe} from '../../order-by.pipe'
import { AuthService } from '../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  query:string = "";
  users:any;
  usersTemp:any;
  roles = [ 'admin', 'dj','show admin', 'author', 'editor' ];



  constructor(
    private authService:AuthService,
    private flashMessage:FlashMessagesService,
    private router:Router,
    private http:Http
  ) { }

  ngOnInit() {

    //gets a list of all users
    this.getUserList().subscribe(data => {
      this.users = data;
    },

    err => {
      console.log(err)
      return false

  });

  }

  //deletes the user in the api, then removes the deleted user from the current list of users in the component
  deleteUser(user): void {
    this
     .deleteReq(user._id)
     .then(() => {
       this.users = this.users.filter(h => h !== user);
     });
  }

  //sends the http request to delete user to the api
  deleteReq(id: number): Promise<void> {

    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/users/delete/' + id);
    return this.http.delete(ep,{headers: headers})
      .toPromise()
      .then(() => null);
  }

//sends the request to the api to retrieve list of all users
  getUserList(){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/users/userlist');
    return this.http.get(ep,{headers: headers})
      .map(res => res.json());
  }

  //checks to see if a user has a role, returns true if they do, otherwise returns false
  hasRole(role, user){
    if(user.roles){
      if(user.roles.indexOf(role) > -1){
        return true
      }

    } else {
      return false
    }
  }

//if the role is being checked, adds that role to the user's roles, otherwise it removes it from the roles
  checkFun(e, role, user){
    if(e.target.checked){
      let roles = user.roles;
      if (!this.hasRole(role, user)){
        roles.push(role);
        this.updateUserRoles(roles, user._id).subscribe(data => {
          return true
        },
        err => {
          console.log(err);

        });
      }

    } else if (!e.target.checked){

      let roles = this.remove(user.roles, role)
      this.updateUserRoles(roles, user._id).subscribe(data => {
        return true
      },
      err => {
        console.log(err);

      });
    }
  }

//sends the request to the api to update user roles
  updateUserRoles(roles, userId){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/users/update-roles/' + userId);
    return this.http.put(ep, roles, {headers: headers})
      .map(res => res.json())


  }

  //returns an array with a given element removed from it
  remove(arr, what) {
    var found = arr.indexOf(what);

    while (found !== -1) {
        arr.splice(found, 1);
        found = arr.indexOf(what);
    }

    return arr;
  }

//returns the users that match the query
  filter(){
  this.usersTemp =  this.users.filter( (el) => {
      var result="";
        for(var key in el){
          result+= el[key];
        }
        return result.toLowerCase().indexOf(this.query.toLowerCase()) > -1;

    }
  )};

//if there is no query, returns the full list of users, otherwise returns the filtered list of users
  getData(){
    if(this.query !== ""){
      return this.usersTemp;
    }else{
      return this.users;
    }
  }

}
