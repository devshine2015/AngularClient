import { Injectable } from '@angular/core';
import * as moment from 'moment';

const Moment: any = (<any>moment).default || moment;

@Injectable()
export class DateTimeService {

  constructor() { }

  monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  days2 = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  days = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  abbrDays = ['SUN','MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];


  times = ['0000-0030', '0030-0100', '0100-0130', '0130-0200', '0200-0230', '0230-0300', '0300-0330', '0330-0400', '0400-0430', '0430-0500', '0500-0530', '0530-0600', '0600-0630', '0630-0700', '0700-0730', '0730-0800', '0800-0830', '0830-0900', '0900-0930', '0930-1000', '1000-1030', '1030-1100', '1100-1130', '1130-1200', '1200-1230', '1230-1300', '1300-1330', '1330-1400', '1400-1430', '1430-1500', '1500-1530', '1530-1600', '1600-1630', '1630-1700', '1700-1730', '1730-1800', '1800-1830', '1830-1900', '1900-1930', '1930-2000', '2000-2030', '2030-2100', '2100-2130', '2130-2200', '2200-2230', '2230-2300', '2300-2330', '2330-0000'];

  makeIntoObjects(array){
  var objArray = []
  let len = array.length
    for (var i = 0; i < len; i++){
      objArray.push({id: i, name: array[i]})
    }
  return objArray
  }

  displayMonth(date){
    let monthIndex = date.getMonth();
    return this.monthNames[monthIndex]
  }

  displayDay(date){
    let dayIndex = date.getDay();

    return this.days[dayIndex];
  }

  dateForImport(day, slot){

      let d = day;
      let x = d + slot;
      if (x === 7){
        return 0;
      } else if ( x === 8){
        return 1;
      } else if (x === 9){
        return 2;
      } else if (x === 10){
        return 3;
      } else if (x === 11){
        return 4;
      } else if (x === 12){
        return 5;
      } else if (x === 13){
        return 6;
      } else if (x === 14){
        return 0;
      } else {
        return x;
      }


  }

  getDayForWeekly(date, n){
    let day = date.getDay();
    let day1 = day + n;

    if(day1 == 7){
      return this.days[0];
    } else if(day1 == 8) {
      return this.days[1];
    } else if(day1 == 9){
      return this.days[2];
    } else if(day1 == 10){
      return this.days[3];
    } else if(day1 == 11){
      return this.days[4];
    } else if(day1 == 12){
      return this.days[5];
    } else if(day1 == 13){
      return this.days[6];
    } else {
      return this.days[day1];
    }
  }

  displayDate(date){
    return date.getDate();
  }

  getLowestSlot(show){
    let x = show.timeslots;
    return Math.min(...x);
  }

  getStartHour(show){
    let slot = this.getLowestSlot(show)
    if(slot === 0 || slot === 1){
      return 0
    } else if (slot === 2 || slot === 3){
      return 1;
    } else if (slot === 4 || slot === 5){
      return 2;
    } else if (slot === 6 || slot === 7){
      return 3;
    } else if (slot === 8 || slot === 9){
      return 4;
    } else if (slot === 10 || slot === 11){
      return 5;
    } else if (slot === 12 || slot === 13){
      return 6;
    } else if (slot === 14 || slot === 15){
      return 7;
    } else if (slot === 16 || slot === 17){
      return 8;
    } else if (slot === 18 || slot === 19){
      return 9;
    } else if (slot === 20 || slot === 21){
      return 10;
    } else if (slot === 22 || slot === 23){
      return 11;
    } else if (slot === 24 || slot === 25){
      return 12;
    } else if (slot === 26 || slot === 27){
      return 13;
    } else if (slot === 28 || slot === 29){
      return 14;
    } else if (slot === 30 || slot === 31){
      return 15;
    } else if (slot === 32 || slot === 33){
      return 16;
    } else if (slot === 34 || slot === 35){
      return 17;
    } else if (slot === 36 || slot === 37){
      return 18;
    } else if (slot === 38 || slot === 39){
      return 19;
    } else if (slot === 40 || slot === 41){
      return 20;
    } else if (slot === 42 || slot === 43){
      return 21;
    } else if (slot === 44 || slot === 45){
      return 22;
    } else if (slot === 46 || slot === 47){
      return 23;
    }
  }

  getStartMinute(show){
    let slot = this.getLowestSlot(show)
    if((slot === 0) || (slot % 2 == 0) ){
      return 0
    } else {
      return 30
    }
  }

  calculateEndDate(date, show){

    let dur = show.duration;
    let d = new Date(date);

    if (dur === '1/2 hr'){
      return new Date(d.setMinutes(d.getMinutes() + 30));
    } else if (dur === '1 hr' ){
      return new Date(d.setHours(d.getHours() + 1));
    } else if (dur === '2 hr') {
      return new Date(d.setHours(d.getHours() + 2));
    } else if (dur === '3 hr') {
      return new Date(d.setHours(d.getHours() + 3));
    }
  }

  //takes a day index and returns an abbreviated day name
  getAbbrvDay(i: number){
    return this.abbrDays[i];
  }


}
