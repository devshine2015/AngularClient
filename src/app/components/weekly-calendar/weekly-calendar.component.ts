import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import {DateTimeService} from '../../services/date-time.service';
import {ShowService} from '../../services/show.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-weekly-calendar',
  templateUrl: './weekly-calendar.component.html',
  styleUrls: ['./weekly-calendar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WeeklyCalendarComponent implements OnInit {
  @Input() selectedDate:Date;
  day1Shows:any;
  day2Shows:any;
  day3Shows:any;
  day4Shows:any;
  day5Shows:any;
  day6Shows:any;
  day7Shows:any;
  day8Shows:any;
  allShows:any;
  weekDay:number;
  placeholder:any;



  constructor(
    private dateTime:DateTimeService,
    private showService:ShowService,
    private router: Router
  ) { }

  ngOnInit() {

    this.weekDay = this.selectedDate.getDay();

    this.showService.getPlaceholder().subscribe(data => {
      this.placeholder = data;
    }, err => {
      console.log(err);
      return false;
    });

    this.showService.getOnAir().subscribe(data => {
      this.allShows = data;
    },
    err => {
      console.log(err);
      return false;
    });

  }



  dayName(n){
    var day = this.dateTime.getDayForWeekly(this.selectedDate, n)
    return "<h4><strong>" + day +"</strong></h4>"
  }

  displaySlot(day, hour, minute){

    let shows = this.getShowsInSlot(day, hour, minute);



    if(shows){
      if(this.checkPreviousSlot(hour, minute, day)){
        return null;
      } else {
        let s = this.findByType('One-off', shows, day);
        let w = this.findByType('Weekly', shows, day);
        let b = this.findByType('Bi-weekly', shows, day);

        if (s.length === 1){
          return this.display(s)
        } else if ( s.length > 1 ) {
          return this.display(s[0]);
        } else if ((s.length === 0) && (w.length === 1)){
          return this.display(w);
        } else if ((s.length === 0) && (w.length > 1)){
          return this.display(w[0]);
        } else if ((s.length === 0 ) && (w.length === 0) && (b.length > 0)){
          let f = this.calculateBiWeekly(b, this.calculateDate(day))
          if (f.length === 0) {
            return this.displayPlaceholder();
          } else {
            return this.display(f)
          }
        } else {
          return this.displayPlaceholder();
        }
      }
    }
  }

  //returns a date object based on the selectedDate plus a given number
  calculateDate(day: number){

    var d = new Date(this.selectedDate.valueOf());

    if(day == 0){
      return new Date(d);
    } else {
      return new Date(d.setDate(d.getDate() + day));
    }
  }

  //return all shows that start at a given time, on a given day
  getShowsInSlot(day:number, hour:string, minute:string){
    let h = Number(hour);
    let m = Number(minute);

    if(this.allShows){
      return this.allShows.filter(el => this.checkTime(el, day, h, m));
    }


  }

  //returns true if a show starts at a given hour, day and minute
  checkTime(show:any, day:number, hour:number, minute:number){
    let d = this.getWeekDay(day);

    let h = Number(show.startHour);
    let m = Number(show.startMinute);


    if ((show.startDays.some(el => el === d)) && (h === hour) && (m === minute)) {
      return true;
    } else {
      return false
    }
  }

  // get a weekday index number from a weekday slot number
  getWeekDay(day: number){
    switch(day) {
      case 0:
        return this.weekDay;
      case 1:
        return this.dateTime.dateForImport(this.weekDay, 1);
      case 2:
        return this.dateTime.dateForImport(this.weekDay, 2);
      case 3:
        return this.dateTime.dateForImport(this.weekDay, 3);
      case 4:
        return this.dateTime.dateForImport(this.weekDay, 4);
      case 5:
        return this.dateTime.dateForImport(this.weekDay, 5);
      case 6:
        return this.dateTime.dateForImport(this.weekDay, 6);
      case 7:
        return this.dateTime.dateForImport(this.weekDay, 7);
    }

  }

  checkPreviousSlot(hour:string, minute:string, day:number){
    let h = Number(hour);
    let m = Number(minute);
    let test = []

    if (this.allShows){
      test = this.allShows.filter(el => this.checkDifferentStart(el, day, h, m));
      if (test.length > 0){
        return true;
      }
    }



  }

  //check if there is a show that started at a different time, but that runs through the given time
  checkDifferentStart(show:any, day:number, hour:number, minute:number){
    let d = this.getWeekDay(day);
    let cross = false;
    let h = Number(show.startHour);
    let hend = Number (show.endHour);
    let m = Number(show.startMinute);
    let mend = Number(show.endMinute);


    if (show.startDays[0] != show.endDays[0]){
      cross = true;
    }
    if(!this.checkTime(show, day, hour, minute) && (cross === false) && (show.startDays.some(el => el === d))){
      if((h === hour) && (m != minute)){
        return true;
      } else if ((h < hour) && (hend > hour)) {
        return true;
      } else if ((hend === hour) && (mend > minute)){
        return true;
      } else {
        return false;
      }
    } else if (!this.checkTime(show, day, hour, minute) && (cross === true) && (show.startDays.some(el => el === d - 1)) ) {
      if ((hend === hour) && (mend != minute)) {
        return true;
      } else if ((hend > hour)) {
        return true;
      } else {
        return false;
      }
    }
  }

  //get shows for a day
  getShowDay(day:number){
    if(day == 0){
      return this.day1Shows;
    } else if (day == 1){
      return this.day2Shows;
    } else if (day == 2){
      return this.day3Shows;
    } else if (day == 3){
      return this.day4Shows;
    } else if (day == 4){
      return this.day5Shows;
    } else if (day == 5){
      return this.day6Shows;
    } else if (day == 6){
      return this.day7Shows;
    } else if (day == 7){
      return this.day8Shows;
    }
  }

  findByType(type, shows, day){
    if(shows){
      return shows.filter(el =>{
        let d = new Date(this.selectedDate.valueOf());
        let value;
        var d1 = null;
        if(day == 0){
          d1 = new Date(d);
        } else if (day == 1){
          d1 = new Date(d.setDate(d.getDate() + 1));
        } else if (day == 2){
          d1 = new Date(d.setDate(d.getDate() + 2));
        } else if (day == 3){
          d1 = new Date(d.setDate(d.getDate() + 3));
        } else if (day == 4){
          d1 = new Date(d.setDate(d.getDate() + 4));
        } else if (day == 5){
          d1 = new Date(d.setDate(d.getDate() + 5));
        } else if (day == 6){
          d1 = new Date(d.setDate(d.getDate() + 6));
        } else if (day == 7){
          d1 = new Date(d.setDate(d.getDate() + 7));
        }
        let d2 = new Date(el.startDate);

        if (el.endDate){
          var d3 = new Date(el.endDate);
        } else {
           d3 = null
        }

        if ((el.type === type) && (d2 < d1) && (d3 > d1)){
          value = value + el;
        } else if ((el.type === type) && (d2 < d1) && (d3 === null)){
          value = value + el;
        }

        return value;
      });
    }

  }

  display(show){

    let duration = this.getDuration(show);
    let s = show[0]

    let genre = "";

    if (s.genre === "Metal") {
      genre = "metal";
    } else if (s.genre === "RPM") {
      genre = "rpm";
    } else if (s.genre === "Alt-rock") {
      genre = "alt-rock";
    } else if (s.genre === "Hip-Hop") {
      genre = "hip-hop";
    } else if (s.genre === "Jazz") {
      genre = "jazz";
    } else if (s.genre === "Specialty") {
      genre = "specialty";
    } else if (s.genre === "World") {
      genre = "world";
    } else if (s.genre === "Talk") {
      genre = "talk";
    }

    return ['<div class="', duration, ' flipper','"><div class="title ', genre, '-tab front">', s.name, '</div><div class="back ', genre, '-tab">', s.description, '</div></div>'].join('');


  }

  calculateBiWeekly(shows, date){
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    return shows.filter(el => {
      let d = new Date(el.startDate)
      let d1 = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
      let d2 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      if ((Math.floor(((d2 - d1)) / _MS_PER_DAY) % 14) === 0){
        return el
      }
    })
  }

  //displays a placeholder show in a slot if no show is assigned to that slot
  displayPlaceholder(){
    if(this.placeholder){
      return ['<div class="half-hour talk-tab">', this.placeholder.name, '</div>'].join('');
    }
  }

  getDuration(show){
    let dur = show[0].duration
    if(dur === '1 hr'){
      return 'one-hour';
    } else if (dur === '1/2 hr') {
      return 'half-hour';
    } else if (dur === '2 hr') {
      return 'two-hour';
    } else if (dur === '3 hr') {
      return 'three-hour';
    }
  }

  linkToShow(day, hour, minute){
    let shows = this.getShowsInSlot(day, hour, minute);



    if(shows){
      if(this.checkPreviousSlot(hour, minute, day)){
        return null;
      } else {
        let s = this.findByType('One-off', shows, day);
        let w = this.findByType('Weekly', shows, day);
        let b = this.findByType('Bi-weekly', shows, day);

        if (s.length === 1){
          this.router.navigate(['/show', s[0]._id]);
        } else if ( s.length > 1 ) {
          this.router.navigate(['/show', s[0]._id]);
        } else if ((s.length === 0) && (w.length === 1)){
          this.router.navigate(['/show', w[0]._id]);
        } else if ((s.length === 0) && (w.length > 1)){
          this.router.navigate(['/show', w[0]._id]);
        } else if ((s.length === 0 ) && (w.length === 0) && (b.length > 0)){
          let f = this.calculateBiWeekly(b, this.calculateDate(day))
          if (f.length === 0) {
            this.router.navigate(['/show', this.placeholder._id]);
          } else {
            this.router.navigate(['/show', f[0]._id]);
          }
        } else {
          this.router.navigate(['/show', this.placeholder._id]);
        }
      }
    }
  }

}
