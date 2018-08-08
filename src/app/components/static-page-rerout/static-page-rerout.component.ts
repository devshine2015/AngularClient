import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-static-page-rerout',
  templateUrl: './static-page-rerout.component.html',
  styleUrls: ['./static-page-rerout.component.css']
})
export class StaticPageReroutComponent implements OnInit {

  id:number;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    //takes the id from the route params and assigns it to id variable
    this.id = this.route.snapshot.params['id'];

    this.router.navigate(['/static-page', this.id], { skipLocationChange: true })
  }

}
