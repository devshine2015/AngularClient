import { Component, OnInit, OnChanges, Input, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ShowService } from '../../services/show.service';
import { DateTimeService } from '../../services/date-time.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-calendar-display',
  templateUrl: './calendar-display.component.html',
  styleUrls: ['./calendar-display.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarDisplayComponent implements OnInit {
  @Input() selectedDate:Date;
  allShows:any

  constructor(
    private showService:ShowService,
    private dateTime:DateTimeService,
    private router:Router
  ) { }

  ngOnInit() {
    this.showService.getShowsForDay(this.selectedDate).subscribe(data => {
      this.allShows = data;
    },
    err => {
      console.log(err);
      return false
    });
  }

  ngOnChanges(changes:SimpleChanges){
    let chng = changes['selectedDate']
    if(chng){
      this.showService.getShowsForDay(chng.currentValue.getDay()).subscribe(data => {
        this.allShows = data;

      },
      err => {
        console.log(err);
        return false;
      });
    }
  }

  //returns the show to display
  displayShow(slot){
    let shows = this.getShowsInSlot(slot);

    if(shows){

      if (this.checkPreviousSlot(slot, shows)){
        return null
      } else {

        let s = this.findByType('One-off', shows);
        let w = this.findByType('Weekly', shows);
        let b = this.findByType('Bi-weekly', shows);


        if (s.length === 1){
          return this.display(s)
        } else if ( s.length > 1 ) {
          return this.display(s[0]);
        } else if ((s.length === 0) && (w.length === 1)){
          return this.display(w);
        } else if ((s.length === 0) && (w.length > 1)){
          return this.display(w[0]);
        } else if ((s.length === 0 ) && (w.length === 0) && (b.length > 0)){
          let f = this.calculateBiWeekly(b)
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


  //Takes an array of bi-weekly shows and returns the show if it is to be displayed on the selectedDate
  calculateBiWeekly(shows){
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    return shows.filter(el => {
      let d = new Date(el.startDate)
      let d1 = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
      let d2 = Date.UTC(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), this.selectedDate.getDate())
      if ((Math.floor(((d2 - d1)) / _MS_PER_DAY) % 14) === 0){
        return el
      }
    })
  }

  //displays a placeholder show in a slot if no show is assigned to that slot
  displayPlaceholder(){
    return '<div class="half-hour">Placeholder</div>'
  }
  //filters list of all shows for a day and returns the ones in a slot
  getShowsInSlot(slot){
    if(this.allShows){
      return this.allShows.filter(el => el.timeslots.some(timeslot => timeslot === slot))
    }
  }

  findByType(type, shows){
    return shows.filter(el =>{
      let value;
      let d1 = new Date(this.selectedDate);
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


  display(show){
    let duration = this.getDuration(show);
    let s = show[0]

    return ['<div class=', duration, '><img src="http://localhost:3000/', s.thumbnailPath, '"><span class="title">', s.name, '</span><span class="description">', s.description, '</span><span class="tags"><strong>Tags:</strong> ', s.tags, '</span></div>'].join('')


  }

  checkPreviousSlot(slot, shows){
    let s = this.getShowsInSlot(slot - 1);
    return shows.some((v) => {
      return s.indexOf(v) >= 0;
    })
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

  linkToShow(slot){
    let shows = this.getShowsInSlot(slot)

    let s = this.findByType('One-off', shows);
    let w = this.findByType('Weekly', shows);
    let b = this.findByType('Bi-weekly', shows);

    if (s.length === 1){
      this.router.navigate(['/show', s[0]._id])
    } else if ((s.length === 0) && (w.length === 1)) {
      this.router.navigate(['/show', w[0]._id])
    } else if ((s.length === 0) && (w.length > 1)){
      this.router.navigate(['/show', w[0]._id])
    } else if ((s.length === 0 ) && (w.length === 0) && (b.length > 0)){
      let f = this.calculateBiWeekly(b)
      this.router.navigate(['/show', f[0]._id])
    } else {
      this.navigateToPlaceholder()
    }
  }

  //navigates to the placeholder show
  navigateToPlaceholder(){

  }
}
