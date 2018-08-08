import { Component, OnInit } from '@angular/core';
import {ShowService} from '../../services/show.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {

  shows: any;

  constructor(
    private ss:ShowService,
    private router: Router
  ) { }

  ngOnInit() {

    //gets all shows that are listed as on the air
    this.ss.getOnAir().subscribe(data => {
      this.shows = data;
    }, err => {
      console.log(err);
      return false;
    })
  }

  //links to a show's page from the div
  linkToShow(show){
    this.router.navigate(['/show', show._id])
  }

  //transforms array into a string
  render(array){
    return array.join(', ')
  }

}
