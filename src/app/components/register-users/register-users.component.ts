import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service'
import { AuthService } from '../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import { Http, Headers} from '@angular/http';


@Component({
  selector: 'app-register-users',
  templateUrl: './register-users.component.html',
  styleUrls: ['./register-users.component.css']
})
export class RegisterUsersComponent implements OnInit {

  username: String;
  email: String;
  password: String;
  roles = [
    {name: 'admin', checked: false},
    {name: 'dj', checked: false},
    {name: 'show admin', checked: false},
    {name: 'author', checked: false},
    {name: 'editor', checked: false}
  ]


  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private http:Http
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      username: this.username,
      email: this.email,
      password: this.password,
      roles: JSON.stringify(this.selectedRoles)

    }

    // Required Fields
    if(!this.validateService.validateUserRegister(user)){
      this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register user
    this.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('User is now registered and can log in', {cssClass: 'alert-success', timeout: 3000});
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register-users']);
      }
    });
  }

//sends http request to register user
  registerUser(user){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/users/register');
    return this.http.post(ep, user,{headers: headers})
      .map(res => res.json());
  }

//returns an array of checked roles
  get selectedRoles() {
    this.roles.push({name:'user', checked:true})
    return this.roles
              .filter(opt => opt.checked)
              .map(opt => opt.name)
  }



}
