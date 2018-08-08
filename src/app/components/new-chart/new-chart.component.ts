import { Component, OnInit } from '@angular/core';
import {PlaylistAndChartsService} from '../../services/playlist-and-charts.service';


@Component({
  selector: 'app-new-chart',
  templateUrl: './new-chart.component.html',
  styleUrls: ['./new-chart.component.css']
})
export class NewChartComponent implements OnInit {

  startDate:Date;
  endDate:Date;
  tracks: any;
  unchartedTracks:any;

  constructor(
    private pcService: PlaylistAndChartsService
  ) { }

  ngOnInit() {
  }

  getChart(){
    this.pcService.getChart(this.startDate, this.endDate).subscribe(data => {
      if(data.success == false){
        console.log(data.msg);
        return false
      } else {

        this.unchartedTracks = data;
        this.makeChart(this.unchartedTracks);
      }
    }, err => {
      console.log(err);
      return false;
    });
  }

  makeChart(tracks){
    var t = []
    class Track {
      public artist:string;
      public title:string;
      public album:string;
      public label:string;
      public year:string;
      public canCon:boolean;
      public lgbtq:boolean;
      public indigenous:boolean;
      public plays:number;

      constructor() {
        this.plays = 1;
      }
    }

    Object.keys(tracks).forEach(key => {
      var x = tracks[key]
      var e = new Track()

      e.artist = x.artist;
      e.title = x.title;
      e.year = x.year;
      e.album = x.album;
      e.label = x.label;
      e.canCon = x.canCon;
      e.lgbtq = x.lgbtq;
      e.indigenous = x.indigenous;

      var findArt = t.findIndex(i => i.artist.toLowerCase() === e.artist.toLowerCase()) === -1;
      var findTit = t.findIndex(i => i.title.toLowerCase() === e.title.toLowerCase()) === -1;
      if (findArt){
        t.push(e)
      } else if (!findArt && findTit) {
        t.push(e)
      } else if (!findArt && !findTit){
      var ind =  t.findIndex(i => (i.artist.toLowerCase() === e.artist.toLowerCase()) && (i.title.toLowerCase() === e.title.toLowerCase()) );
      t[ind].plays = t[ind].plays + 1;
      }

    })
    this.tracks = t;

  }

}
