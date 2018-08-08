import { Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import { PlaylistAndChartsService } from '../../services/playlist-and-charts.service';

@Component({
  selector: 'app-home-page-charts',
  templateUrl: './home-page-charts.component.html',
  styleUrls: ['./home-page-charts.component.css']
})
export class HomePageChartsComponent implements OnInit, OnChanges {

  @Input() chart: string;
  chartData: any;
  chartTitle: string = 'Stationwide'

  constructor(
    private ps: PlaylistAndChartsService
  ) { }

  ngOnInit() {
    this.ps.getFrontChart(this.chart).subscribe(data => {
      this.chartData = data;
      if(this.chart == 'Top 30'){
        this.chartTitle = 'Stationwide'
      } else {
        this.chartTitle = this.chart;
      }
    }, err => {
      console.log(err);
      return false;
    });
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.chart.currentValue == 'Top 30'){
      this.chartTitle = 'Stationwide'
    } else {
      this.chartTitle = changes.chart.currentValue;
    }

    this.ps.getFrontChart(changes.chart.currentValue).subscribe(data => {
      this.chartData = data;
    }, err => {
      console.log(err);
      return false;
    });
  }

}
