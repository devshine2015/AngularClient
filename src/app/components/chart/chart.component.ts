import { Component, OnInit } from '@angular/core';
import { PlaylistAndChartsService } from '../../services/playlist-and-charts.service';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  top30:any;
  ads:any;
  rpm:any;
  rpmAds:any;
  hipHop:any;
  hipHopAds:any;
  metal:any;
  metalAds:any;
  world:any;
  worldAds:any;

  constructor(
    private pc:PlaylistAndChartsService
  ) { }

  ngOnInit() {

    this.pc.getFrontChart('Top 30').subscribe(data => {
      this.top30 = data;
    }, err => {
      console.log(err);
      return false;
    });

    this.pc.getFrontChart('Ads').subscribe(data => {
      this.ads = data;
    }, err => {
      console.log(err);
      return false;
    });

    this.pc.getFrontChart('Rpm').subscribe(data => {
      this.rpm = data;
    }, err => {
      console.log(err);
      return false;
    });

    this.pc.getFrontChart('Rpm Ads').subscribe(data => {
      this.rpmAds = data;
    }, err => {
      console.log(err);
      return false;
    });

    this.pc.getFrontChart('Hip-Hop').subscribe(data => {
      this.hipHop = data;
    }, err => {
      console.log(err);
      return false;
    });

    this.pc.getFrontChart('Hip-Hop Ads').subscribe(data => {
      this.hipHopAds = data;
    }, err => {
      console.log(err);
      return false;
    });

    this.pc.getFrontChart('Metal Ads').subscribe(data => {
      this.metalAds = data;
    }, err => {
      console.log(err);
      return false;
    });

    this.pc.getFrontChart('Metal').subscribe(data => {
      this.metal = data;
    }, err => {
      console.log(err);
      return false;
    });

    this.pc.getFrontChart('World').subscribe(data => {
      this.worldAds = data;
    }, err => {
      console.log(err);
      return false;
    });

    this.pc.getFrontChart('World Ads').subscribe(data => {
      this.worldAds = data;
    }, err => {
      console.log(err);
      return false;
    })
  }

}
