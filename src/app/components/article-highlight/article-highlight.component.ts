import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Http, Headers} from '@angular/http';

@Component({
  selector: 'app-article-highlight',
  templateUrl: './article-highlight.component.html',
  styleUrls: ['./article-highlight.component.css']
})
export class ArticleHighlightComponent implements OnInit, OnChanges {

@Input() articleCategory:string;
articles:any;

  constructor(
    private authService: AuthService,
    private http: Http
  ) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    const cv: SimpleChange = changes.articleCategory;

    if (cv.currentValue == 'Magazine') {
      this.getMagazine().subscribe(data => {
        this.articles = data;
      }, err => {
        console.log(err);
        return false;
      })
    } else if (cv.currentValue == 'Video') {
      this.getVideo().subscribe(data => {
        this.articles = data;
      }, err => {
        console.log(err);
        return false;
      })
    } else if (cv.currentValue == 'News and Events') {
      this.getNewsAndEvents().subscribe(data => {
        this.articles = data;
      }, err => {
        console.log(err);
        return false;
      })
    } else if (cv.currentValue == 'Sessions') {
      this.getSession().subscribe(data => {
        this.articles = data;
      })
    }
  }

  getMagazine(){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/articles/get-magazine');
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

  getNewsAndEvents(){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/articles/get-news-and-events');
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

  getVideo(){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/articles/get-video');
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

  getSession(){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/articles/get-session');
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

}
