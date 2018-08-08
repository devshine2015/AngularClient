import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ShowService} from '../../services/show.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-my-shows',
  templateUrl: './my-shows.component.html',
  styleUrls: ['./my-shows.component.css']
})
export class MyShowsComponent implements OnInit {

  myShows:any;
  user:any;

  constructor(
    private userService:UserService,
    private showService:ShowService,
    private router:Router

  ) { }

  ngOnInit() {

    this.userService.getCurrentUser().subscribe(data => {
      this.user = data.user;
      this.showService.getShowsByUser(data.user).subscribe( data => {
        this.myShows = data;
      },
      err => {
        console.log(err);
        return false
      })
    },
    err => {
      console.log(err)
      return false
    })
  }

}
