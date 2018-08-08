import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Http, Headers} from '@angular/http';


@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.css']
})
export class ArticlePreviewComponent implements OnInit {
  id:number;
  article:any;

  constructor(
    private route:ActivatedRoute,
    private authService:AuthService,
    private http:Http,

  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    //retreives the article and it's componennt parts from the database
    this.getArticle(this.id).subscribe( data => {
      this.article = data;
    });

  }

  //gets article from database
  getArticle(id){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/articles/get/' + id);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

}
