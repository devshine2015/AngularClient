import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
  pure: false
})
export class OrderByPipe implements PipeTransform {

  transform(collection: any, property: any): any {

    //check if collection is an array
    if (!Array.isArray(collection)) { return collection}

    //check if property is defined properly
    if (property === undefined) {
      console.log('property is undefined')
      return collection
    }

      return collection.sort(function(a, b): number {
        if((isNaN(parseFloat(a[property])) || !isFinite(a[property])) || (isNaN(parseFloat(b[property])) || !isFinite(b[property]))){
      //Isn't a number so lowercase the string to properly compare
      if(a[property].toLowerCase() < b[property].toLowerCase()) return -1;
      if(a[property].toLowerCase() > b[property].toLowerCase()) return 1;
    }
    else{
      //Parse strings as numbers to compare properly
      if(parseFloat(a[property]) < parseFloat(b[property])) return -1;
      if(parseFloat(a[property]) > parseFloat(b[property])) return 1;


        return 0
      }
      });
    }
  }
