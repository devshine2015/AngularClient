import { Injectable } from '@angular/core';

@Injectable()
export class DateToStringService {

  constructor() { }

  formatDate(date) {
    date = new Date(date);
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ', ' + year;
  }

  withHours(date){

    date = new Date(date);
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    if (hour < 10){
      hour = '0' + hour.toString();
    }

    if (minutes < 10){
      minutes = '0' + minutes.toString();
    }

    if (seconds < 10) {
      seconds = '0' + seconds.toString();
    }

    return day + ' ' + monthNames[monthIndex] + ', ' + year + ' ' + hour + ':' + minutes + ':' + seconds;

  }

}
