import { Component, OnInit } from '@angular/core';
import { DateTimeService } from '../../services/date-time.service';
import { ShowService } from '../../services/show.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upcoming-programming',
  templateUrl: './upcoming-programming.component.html',
  styleUrls: ['./upcoming-programming.component.css']
})
export class UpcomingProgrammingComponent implements OnInit {

  selectedDate: Date = new Date(Date.now());
  todayShows: any;
  tomorrowShows: any;
  yesterdayShows: any;
  sortedYesterdayShows: any;
  displayShows: Array<any> = [];
  placeholder: any;
  fullArray: any;
  index: number;
  dayIndexArray: Array<number> = [];
  lastDate: Date = new Date(Date.now());
  firstDate: Date = new Date(Date.now());
  tempDayArray: Array <number> = [];
  prevShows: any;

  constructor(
    private dt: DateTimeService,
    private router: Router,
    private showService: ShowService,
    private authService: AuthService
  ) { }
  log (data) {
    console.log(data);
  }
  ngOnInit() {
  this.getShows(this.selectedDate);

  this.showService.getPlaceholder().subscribe(data => {
    this.placeholder = data;
  }, err => {
    console.log(err);
    return false;
  })
  }

  //gets shows from dataase and fills in the array of all shows for yesterday, today, and tomrorrow
  getShows(date){

    this.tempDayArray = [];

    var y = new Date(date);

    y.setDate(y.getDate() - 1);

    this.showService.getShowsForDay(date.getDay()).subscribe(data1 => {
      this.todayShows = data1;

      var ar = []

      this.showService.getShowsForDay(y.getDay()).subscribe(data2 => {
        this.yesterdayShows = data2;
        this.sortedYesterdayShows = this.sortShows(data2);
        ar = this.sortBothShows(date, this.todayShows);
        ar = this.firstShow(date, ar, true);
        ar = this.fillInPlaceholders(date, ar);
        ar = this.removeDuplicates(ar);
        this.populateDisplay(ar, this.findStartSlot(ar, date));
        this.tempDayArray.forEach(el => {this.dayIndexArray.push(el)})
        this.fullArray = ar;
      }, err => {
        console.log(err);
        return false
      });


    }, err => {
      console.log(err);
      return false
    });


  }

//navigates to the page of a given show
linkToShow(id){
  this.router.navigate(['/show', id]);
}

//gets shows for the following day and adds them to the array of current shows
getTomorrowShows(date: Date){

  this.tempDayArray = []

  this.showService.getShowsForDay(date.getDay()).subscribe(data => {
    let ar = []
    this.tomorrowShows = data;

    ar = this.sortBothShows(date, this.tomorrowShows);
    ar = this.firstShow(date, ar, false);
    ar = this.fillInPlaceholders(date, ar);
    ar = this.removeDuplicates(ar);
    ar.forEach(el => {this.fullArray.push(el)});
    this.tempDayArray.forEach(el => {this.dayIndexArray.push(el)})
    this.populateDisplay(this.fullArray, this.index + 1)

  }, err => {
    console.log(err);
    return false
  });
}

//gets shows for the previous day and adds them to the array of current shows
getPreviousShows(date: Date){

  this.tempDayArray = []

  this.showService.getShowsForDay(date.getDay()).subscribe(data1 => {

    this.yesterdayShows = data1;
    this.sortedYesterdayShows = this.sortShows(this.yesterdayShows);

    this.showService.getShowsForDay(date.getDay()).subscribe(data2 => {
      let ar = []
      this.todayShows = data2;

      ar = this.sortBothShows(date, this.todayShows);
      ar = this.firstShow(date, ar, true);
      ar = this.fillInPlaceholders(date, ar);
      ar = this.removeDuplicates(ar);
      ar.reverse().forEach(el => {this.fullArray.unshift(el)});
      this.index = ar.length;
      this.tempDayArray.reverse().forEach(el => {this.dayIndexArray.unshift(el)});
      this.populateDisplay(this.fullArray, this.index - 1);

    }, err => {
      console.log(err);
      return false
    });


  }, err => {
    console.log(err);
    return false;
  })


}

//increments the show for display up by 1
  upSlot() {
    this.displayShows = []

    if(this.index == this.fullArray.length - 6 ){
      this.lastDate.setDate(this.lastDate.getDate() + 1);
      this.getTomorrowShows(this.lastDate);
    } else {
        this.populateDisplay(this.fullArray, this.index + 1);
    }
  }



//increments the show for display down by 1
  downSlot() {
    this.displayShows = [];

    if(this.index == 0 ){
      this.firstDate.setDate(this.firstDate.getDate() - 1);
      this.getPreviousShows(this.firstDate);
    } else {
        this.populateDisplay(this.fullArray, this.index - 1);
    }
  }

  findStartSlot(shows: Array<any>, date: Date){

    let hour = date.getHours();
    let minute = date.getMinutes();
    let day = date.getDay();
    let da = date.getDate();

    return shows.findIndex(el => {
      return ((Number(el.startHour) <= hour && Number(el.startMinute) <= minute) && this.roundDown(Number(el.endHour), Number(el.endMinute), minute, hour));
    })

  }

  //takes end hour and minute values and compares them to the current time. Returns true if end hour and minute are greater than current time
  roundDown(endHour: number, endMinute: number, currMinute: number, currHour:number){
    if(endHour > currHour){
      return true;
    } else if ((endHour == currHour) && (endMinute > currMinute)){
      return true;
    } else {
      return false;
    }
  }

  //takes an index number and populates the display array
  populateDisplay(shows: Array<any>, index: number){

    this.index = index;

    if(index > shows.length - 6){

      this.lastDate.setDate(this.lastDate.getDate() + 1);
      this.getTomorrowShows(this.lastDate);

    }
    let last = 6;
    for(let i = 0; i < last; i++){
      if(shows[index+i])
        this.displayShows.push(shows[index + i]);
      else
        last++;
    }
  }

  //takes an unsorted object containing shows, and returns an array of shows sorted by starting time
  sortShows(shows){
    let ar = [];

    let unsorted = Object.keys(shows);

    Object.keys(shows).sort((a, b) => {
      if(Number(shows[a].startHour) > Number(shows[b].startHour)){
        return 1;
      } else if (Number(shows[a].startHour) > Number(shows[b].startHour)){
        return -1;
      } else if ((Number(shows[a].startHour) === Number(shows[b].startHour)) && (Number(shows[a].startMinute) > Number(shows[b].startMinute))){
        return 1;
      } else if ((Number(shows[a].startHour) === Number(shows[b].startHour)) && (Number(shows[a].startMinute) < Number(shows[b].startMinute))){
        return -1;
      } else {
        return 0;
      }
    }).forEach(el => {
      ar.push(shows[el]);
    });

    return ar
  }

  //creates array of shows for first and second day ordered by start timeslots
  sortBothShows(date: Date, shows: any){
    let ar = [];
    let day = [];

    let ts = this.sortShows(shows);

    ts.forEach(el => { day.push(date.getDay()); ar.push(el)});
    day.forEach(el => {this.tempDayArray.push(el)});

    return ar;
  }

  //if there is a show carrying over from the previous day, brings it in and puts it at the start of the array of today's shows
  firstShow(date: Date, showArray: Array<any>, bool: boolean){
    let ar = showArray;
    let ys = this.sortedYesterdayShows;
    let day = this.tempDayArray;

    if(((Number(ar[0].startHour) > 0) || ((Number(ar[0].startMinute) > 0) && (Number(ar[0].startHour) === 0))) && this.checkLastShow() && bool == true) {
      ar.unshift(ys[ys.length - 1]);
      day.unshift(date.getDay() - 1)

      return ar;

    } else if (((Number(ar[0].startHour) > 0) || ((Number(ar[0].startMinute) > 0) && (Number(ar[0].startHour) === 0))) && !this.checkLastShow()) {
      let ph = this.placeholder;

      ph.startHour = '00';
      ph.startMinute = '00';
      ph.endHour = '00';
      ph.endMinute = '30';

      day.unshift(date.getDay());
      ar.unshift(ph);

      return ar;
    }
  }

  //fills in the placeholders for the day
  fillInPlaceholders(date: Date, shows: Array<any>){
    let ar = shows;
    var counter = 0;
    let day = this.tempDayArray;

    let len = ar.length;
    let z = len - 1;

    for (var i = 0; i < len - 1; i++){

      if((ar[i].endHour != ar[i + 1].startHour) && (ar[i].endMinute != ar[i + 1].startMinute)){
        counter = this.calculateDifference(ar[i], ar[i + 1]);


        for (var j = counter; j > 0; j--){
          let y = counter - j;
          let d = new Date();

          var obj = Object.assign({}, this.placeholder);
          d.setHours(Number(ar[i + y].endHour));
          d.setMinutes(Number(ar[i + y].endMinute));

          let d2 = new Date(d);
          d2.setMinutes(d2.getMinutes() + 30);

          obj.startHour = ar[i + y].endHour;
          obj.startMinute = ar[i + y].endMinute;
          obj.endHour =  this.stringify(d2.getHours());
          obj.endMinute = this.stringify(d2.getMinutes());

          ar.splice(i + y + 1, 0, obj);

          day.push(date.getDay())
        }
      }
    }

    if(!this.checkIfEndDay(ar[z])){
      counter = this.endDayDifference(ar[z]) ;

      for(var x = counter; x > 0; x--){
        let y = counter - x;
        let d = new Date();

        var ph = Object.assign({}, this.placeholder);
        d.setHours(Number(ar[z + y].endHour));
        d.setMinutes(Number(ar[z + y].endMinute));

        let d2 = new Date(d);
        d2.setMinutes(d2.getMinutes() + 30);

        ph.startHour = ar[z + y].endHour;
        ph.startMinute = ar[z + y].endMinute;
        ph.endHour =  this.stringify(d2.getHours());
        ph.endMinute = this.stringify(d2.getMinutes());

        ar.push(ph);
        day.push(date.getDay())


      }
    }
    return ar;
  }


  //checks if a show crosses midnight, or ends at midnight
  checkIfEndDay(show: any){
    if(((show.endHour === '00') && (show.endMinute === '00')) || (Number(show.endHour) < Number(show.startHour))) {
      return true;
    } else {
      return false;
    }
  }

  //adds a 0 to a number if it is less than 10 and returns that number as a string
  stringify(num: number){
    return num < 10 ? '0' + num.toString() : num.toString();
  }

  //returns the number of 30 minute intervals between a show and midnight
  endDayDifference(show){
    let h = Number(show.endHour);
    let m = Number(show.endMinute);

    let d1 = new Date();
    d1.setHours(h);
    d1.setMinutes(m);
    let d2 = new Date(d1);

    d2.setDate(d2.getDate() + 1);
    d2.setHours(0);
    d2.setMinutes(0);
    let minutes = 1000 * 60;

    let t = d2.getTime() - d1.getTime();

    return (t / minutes) / 30;

  }

  //returns the number of 30 minute intervals between two shows
  calculateDifference(show1: any, show2: any){
    let h1 = Number(show1.endHour);
    let m1 = Number(show1.endMinute);
    let h2 = Number(show2.startHour);
    let m2 = Number(show2.startMinute);

    let d1 = new Date();
    let d2 = new Date();

    d1.setHours(h1);
    d1.setMinutes(m1);

    d2.setHours(h2);
    d2.setMinutes(m2);

    let minutes = 1000 * 60;

    let t = d2.getTime() - d1.getTime();

    return (t / minutes) / 30;
  }

  //checks to see if the end time of the last show from the previous day is in the current day; returns true if it is
  checkLastShow(){
    let ys = this.sortedYesterdayShows;
    if(ys[ys.length - 1]){
      return Number(ys[ys.length - 1].endHour) < Number(ys[ys.length - 1].startHour) ? true : false;

    }
  }

  goToSchedule(){
    this.router.navigate(['calendar']);
  }

  //takes an array of shows and removes duplication caused by presence of one-off and bi-weekly shows
  removeDuplicates(shows: Array<any>){
    var ar = shows;
    let len = ar.length;

    for(let i = 0; i < len; i++){

      if(ar[i + 1]){

        if((ar[i].startHour === ar[i + 1].startHour && ar[i].startMinute === ar[i + 1].startMinute) && (ar[i].type == 'Bi-weekly' && ar[i + 1].type == 'Bi-weekly')){

          if(this.calculateBiWeekly(ar[i], this.calculateDate(ar[i].startDate))){
            ar.splice(i + 1, 1);
            this.tempDayArray.splice(i, 1)

          } else if ( this.calculateBiWeekly(ar[i + 1], this.calculateDate(ar[i + 1].startDate))){
            ar.splice(i, 1);
            this.tempDayArray.splice(i, 1)
          }

        } else if ((ar[i].startHour === ar[i + 1].startHour && ar[i].startMinute === ar[i + 1].startMinute) && (ar[i].type == 'One-off' || ar[i + 1].type == 'One-off')){

          if(ar[i].type == 'One-off'){
            ar.splice(i + 1, 1);
            this.tempDayArray.splice(i, 1)

          } else if (ar[i].type == 'One-off'){
            ar.splice(i, 1);
            this.tempDayArray.splice(i, 1)

          }
        }
      }
    }
    return ar;
  }

  calculateBiWeekly(show: any, date: Date){
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

      let d = new Date(show.startDate)
      let d1 = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
      let d2 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
      if ((Math.floor(((d2 - d1)) / _MS_PER_DAY) % 14) === 0){
        return true;
      }

  }

  //returns a date object based on the selectedDate plus a given number
  calculateDate(x: Date){

    var d = new Date(this.selectedDate.valueOf());
    let y = new Date(x);

    let selectDay = d.getDay();
    let otherDay = y.getDay();

    let day = otherDay - selectDay;

    return new Date(d.setDate(d.getDate() + day));
  }

  //takes an index number relative to the display and returns a day of the week in abbreviated format
  dayOfIndex(i: number){
    return this.dt.getAbbrvDay(this.dayIndexArray[this.index + i]);
  }

}
