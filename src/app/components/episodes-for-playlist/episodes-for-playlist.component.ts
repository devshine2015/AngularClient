import { Component, OnInit, Input } from '@angular/core';
import { EpisodeService } from '../../services/episode.service';
import { DateToStringService } from '../../services/date-to-string.service';
import { CookieService } from '../../services/cookie.service';

@Component({
  selector: 'app-episodes-for-playlist',
  templateUrl: './episodes-for-playlist.component.html',
  styleUrls: ['./episodes-for-playlist.component.css']
})
export class EpisodesForPlaylistComponent implements OnInit {

  episodes:any;

  @Input() showId:number;

  constructor(
    private es: EpisodeService,
    private ds: DateToStringService,
    private cookie: CookieService
  ) { }

  ngOnInit() {
    this.es.getPast(this.showId).subscribe((data) => {
      this.episodes = data;
    }, err => {
      console.log(err);
      return false;
    })
  }

  addToPlaylist(n){
    this.cookie.updatePlaylist(n);
  }

}
