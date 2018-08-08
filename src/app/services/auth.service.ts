import { Injectable } from '@angular/core';
import {Response, ResponseContentType, RequestOptions, Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {tokenNotExpired} from 'angular2-jwt';


@Injectable()
export class AuthService {
  isDev:boolean;
  authToken:any;
  user:any;

  constructor(
    private http:Http,
    ) {
    this.isDev = false; // Change to false before deployment
  }

//returns IP if environment is production, localhost if it is development
  returnIp(){
    if(this.isDev){
      return 'http://localhost:3000/'
    } else {
      return "http://34.198.177.246:3000/"
    }
  }

//sends username and password to api for authentication
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    let ep = this.prepEndpoint('http://localhost:3000/users/authenticate');
    return this.http.post(ep, user,{headers: headers})
      .map(res => res.json());
   }

//stores user data in local storage
  storeUserData(token, user){
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

//gets user info from local storage
  loadToken(){
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

//sets headers for http requests that require authorization
setHeaders(){
  let headers = new Headers();
  this.loadToken();
  headers.append('Authorization', this.authToken);
  headers.append('Content-Type', 'application/json');
  return headers;
}

//checks to see if user is currently logged in
  loggedIn(){
    return tokenNotExpired();
  }


//clears local storage on logout
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

//changes url of al requests in production environment
  prepEndpoint(ep){
    if(this.isDev){
      console.log(this.isDev)

      return ep;
    } else {
    var delimiter = '/';
    var start = 3;
    var tokens = ep.split(delimiter).slice(start);
    var result = tokens.join(delimiter);

    return 'http://34.198.177.246:3000/'+ result;
    //return 'http://192.168.0.52:3000/'+ result;
    }
  }
}
