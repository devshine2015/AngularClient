import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ShowService } from '../../services/show.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import {DateToStringService} from '../../services/date-to-string.service';

@Component({
  selector: 'app-show-page',
  templateUrl: './show-page.component.html',
  styleUrls: ['./show-page.component.css']
})
export class ShowPageComponent implements OnInit {
  id:number;
  thumbnailPath:string;
  bannerPath:string;
  show:any;
  episodes:any;

  constructor(
    private route:ActivatedRoute,
    private authService:AuthService,
    private showService:ShowService,
    private router:Router,
    private ds: DateToStringService

  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.showService.getShowById(this.id).subscribe(data => {
      this.show = data;
      if(data.thumbnailPath){
        this.thumbnailPath = data.thumbnailPath;
      }
      if(data.bannerPath){
        this.bannerPath =  data.bannerPath;
      }

    },
    err => {
      console.log(err)
      return false
    });

    this.showService.getPastEpisodes(this.id).subscribe(data => {
      this.episodes = data;
    }, err => {
      console.log(err);
      return false
    })

  }

  linkToEpisode(episode){
    this.router.navigate(['/episode', episode._id])
  }

}
