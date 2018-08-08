import { Component, OnInit } from '@angular/core';
import { ShowService } from '../../services/show.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-shows-for-playlist',
  templateUrl: './shows-for-playlist.component.html',
  styleUrls: ['./shows-for-playlist.component.css']
})
export class ShowsForPlaylistComponent implements OnInit {

  shows:any;
  clicked:number = null;

  constructor(
    private ss: ShowService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.ss.getForPlaylist().subscribe((data) => {
      this.shows = data;
    }, err => {
      console.log(err);
      return false;
    })
  }

  toggleEpisodes(n){
    if (this.clicked === n){
      this.clicked = null;
    } else {
      this.clicked = n;
    }
  }

}
