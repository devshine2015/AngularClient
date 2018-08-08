import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ShowService } from '../../services/show.service';
import { EpisodeService } from '../../services/episode.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import {DateToStringService} from '../../services/date-to-string.service';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent implements OnInit {

  id:number;
  episode:any;
  show:any;

  constructor(
    private route:ActivatedRoute,
    private authService:AuthService,
    private showService:ShowService,
    private ep:EpisodeService,
    private ds: DateToStringService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']

    this.ep.getEpisodeById(this.id).subscribe(data => {
      this.episode = data;
      this.show = data.show;
    }, err => {
      console.log(err);
      return false
    });
  }

}
