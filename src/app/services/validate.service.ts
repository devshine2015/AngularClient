import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

//checks to see if user has username, email, and password
  validateUserRegister(user){
      if (user.username == undefined || user.email == undefined || user.password == undefined){
        return false;
      } else {
        return true;
      }
  }

//ensures that the email entered is a valid email
  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
