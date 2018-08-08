import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ShowService} from '../../services/show.service';
import {GetRolesService} from '../../services/get-roles.service';
import {DateTimeService} from '../../services/date-time.service';
import {Http, Headers} from '@angular/http';
import {FlashMessagesService} from 'angular2-flash-messages';
import {OrderByPipe} from '../../order-by.pipe';



@Component({
  selector: 'app-manage-shows',
  templateUrl: './manage-shows.component.html',
  styleUrls: ['./manage-shows.component.css']
})
export class ManageShowsComponent implements OnInit {

  shows:any;

  constructor(
    private authService:AuthService,
    private showService:ShowService,
    private http:Http,
    private rs:GetRolesService,
    private flashMessage:FlashMessagesService,
    private dateTime:DateTimeService
  ) { }

  ngOnInit() {
    //sets the shows variable to a list of all shows retrieved from the api
    this.showService.getShows().subscribe(data => {
      this.shows = data
    },
    err => {
      console.log(err)
      return false
    });
  }

  //takes the days represented as an array of numbers and returns a string of weekdays as words
  displayDays(show){
    let str = '';
    let len = show.startDays.length;
    for(let i = 0; i < len; i++) {
      str = str + this.dateTime.days[show.startDays[i]] + ' ';
    }
    return str
  }


  //sets the on air status of a show
  onAir(e, show){
    if(e.target.checked){
      this.showService.changeOnAirStatus(show, true).subscribe(data => {
        if (data.success){
          this.flashMessage.show('Show will now air as scheduled', {cssClass: 'alert-success', timeout: 5000});
          return true
        }
      },
      err => {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 5000});
        console.log(err)
        return false
      });
    } else if (!e.target.checked){
      this.showService.changeOnAirStatus(show, false).subscribe(data => {
        if (data.success){
          this.flashMessage.show('Show will no longer air', {cssClass: 'alert-success', timeout: 5000});
          return true
        }
      },
      err => {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 5000});
        console.log(err)
        return false
      });
    }

  }


//sets the archive status of a show
  archive(e, show){
    if (e.target.checked){
      this.showService.changeArchiveStatus(show, true).subscribe(data => {
        if (data.success){
          this.flashMessage.show('Show will now appear in the archives', {cssClass: 'alert-success', timeout: 5000});
          return true
        }
      },
      err => {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 5000});
        console.log(err)
        return false
      });
    } else if (!e.target.checked){
      this.showService.changeArchiveStatus(show, false).subscribe(data => {
        if (data.success){
          this.flashMessage.show('Show will no longer appear in the archives', {cssClass: 'alert-success', timeout: 5000});
          return true
        }
      },
      err => {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 5000});
        console.log(err)
        return false
      });
    }

  }


  //filters the local array of shows to remove the deleted show
  filterShows(id) {
    this.shows = this.shows.filter(h => h._id != id)
  }

  deleteShow(id){
    this.showService.deleteShow(id).then(() => this.filterShows(id))
  }

}
