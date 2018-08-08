import { Component, OnInit } from '@angular/core';
import {GetRolesService} from '../../services/get-roles.service';
import {AuthService} from '../../services/auth.service';
import {Http, Headers} from '@angular/http';
import {DateToStringService} from '../../services/date-to-string.service';


@Component({
  selector: 'app-article-review',
  templateUrl: './article-review.component.html',
  styleUrls: ['./article-review.component.css']
})
export class ArticleReviewComponent implements OnInit {
  articles: any;

  constructor(
    private rolesService:GetRolesService,
    private authService:AuthService,
    private http:Http,
    private dateString:DateToStringService
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

  //retrieves all articles under review from the api
  getArticles(){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/articles/get-review');
    return this.http.get(ep, {headers: headers})
      .map(res => res.json())
  }

  //makes request to api to delete an article
    deleteArticle(id): Promise<void> {
      let headers = this.authService.setHeaders();
      let ep = this.authService.prepEndpoint('http://localhost:3000/articles/delete/' + id);
      return this.http.delete(ep, {headers:headers})
        .toPromise()
        .then(() => this.filterArticles(id));
    }

  //filters the local array of articles to remove the deleted article
    filterArticles(id) {
      this.articles = this.articles.filter(h => h._id != id)
    }

}
