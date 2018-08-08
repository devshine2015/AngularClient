import { Component, OnInit } from '@angular/core';
import {PlaylistAndChartsService} from '../../services/playlist-and-charts.service';
import {DateToStringService} from '../../services/date-to-string.service';

@Component({
  selector: 'app-new-playlist',
  templateUrl: './new-playlist.component.html',
  styleUrls: ['./new-playlist.component.css']
})
export class NewPlaylistComponent implements OnInit {

  tracks:any;
  startDate:Date;
  endDate:Date;

  constructor(
    private pcService:PlaylistAndChartsService,
    private ds:DateToStringService
  ) { }

  ngOnInit() {
  }

  getPlaylist(){
    let start = this.startDate;
    let end = this.endDate;

    this.pcService.getPlaylist(start, end).subscribe(data => {
      if (data.success == false){
        console.log(data.msg)
        return false
      } else {
        this.tracks = data;
      }
    }, err => {
      console.log(err)
      return false
    })
  }

}
