import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Http, Headers} from '@angular/http';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-static-pages',
  templateUrl: './static-pages.component.html',
  styleUrls: ['./static-pages.component.css']
})
export class StaticPagesComponent implements OnInit {

  articles:any;

  constructor(
    private authService:AuthService,
    private http:Http,
    private flashMessage:FlashMessagesService
  ) { }

  ngOnInit() {

    this.getArticles().subscribe(data => {
      this.articles = data;
    },
    err => {
      console.log(err)
      return false;
    })
  }


  //makes request to api to delete an article
  deleteArticle(id): Promise<void> {
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/static-pages/delete/' + id);
    return this.http.delete(ep, {headers:headers})
      .toPromise()
      .then(() => this.filterArticles(id));
  }

  //filters the local array of articles to remove the deleted article
  filterArticles(id) {
    this.articles = this.articles.filter(h => h._id != id)
  }

  //retrieves all static pages from the api
  getArticles(){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/static-pages/get-pages');
    return this.http.get(ep, {headers: headers})
      .map(res => res.json())
  }

  published(e, article){
    if(e.target.checked){
      let published = {
        published: true
      }

      let headers = this.authService.setHeaders();
      let ep = this.authService.prepEndpoint('http://localhost:3000/static-pages/published/' + article._id);
      return this.http.put(ep, published, {headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          if (data.success){
            console.log("Static page is now published")
          } else {
            console.log("Failed to change status")
          }
        });
    } else if (!e.target.checked){
      let published = {
        published: false
      }

      let headers = this.authService.setHeaders();
      let ep = this.authService.prepEndpoint('http://localhost:3000/static-pages/published/' + article._id);
      return this.http.put(ep, published, {headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          if (data.success){
            console.log("Static page is no longer published")
          } else {
            console.log("Failed to change status")
          }
        });
    }
  }

}
