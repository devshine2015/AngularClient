import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Http, Headers} from '@angular/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user:any;

  constructor(
    private authService:AuthService,
    private http:Http
  ) { }

  ngOnInit() {
    //sets the component's user variable to equal the user info retrieved from the api
    this.getProfile().subscribe(profile => {
      this.user = profile.user;

    },
    err => {
      console.log(err);
      return false;
    });
  }

//requests user info from the api
  getProfile(){
      let headers = this.authService.setHeaders();
      let ep = this.authService.prepEndpoint('http://localhost:3000/users/profile');
      return this.http.get(ep,{headers: headers})
        .map(res => res.json());

  }

}
