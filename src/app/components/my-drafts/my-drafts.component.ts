import { Component, OnInit } from '@angular/core';
import {GetRolesService} from '../../services/get-roles.service';
import {AuthService} from '../../services/auth.service';
import {Http, Headers} from '@angular/http';
import {DateToStringService} from '../../services/date-to-string.service';

@Component({
  selector: 'app-my-drafts',
  templateUrl: './my-drafts.component.html',
  styleUrls: ['./my-drafts.component.css']
})
export class MyDraftsComponent implements OnInit {

user:any;
drafts:any;

  constructor(
    private rolesService:GetRolesService,
    private authService:AuthService,
    private http:Http,
    private dateString:DateToStringService
  ) { }

  ngOnInit() {
    //gets user info from the api
    this.rolesService.getProfile().subscribe( data => {
      this.user = data.user
      this.getDrafts();

    },
    err => {
      console.log(err);
      return false;
    });
  }

//makes request to the api to get all drafts for a user id
  getDrafts(){
    let id = this.user._id;
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/articles/get-drafts/' + id);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        this.drafts = data;
      },
      err => {
        console.log(err);
        return false
      });
  }

//makes request to api to delete an article
  deleteArticle(id): Promise<void> {
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/articles/delete/' + id);
    return this.http.delete(ep, {headers:headers})
      .toPromise()
      .then(() => this.filterDrafts(id));
  }

//filters the local array of drafts to remove the deleted article
  filterDrafts(id) {
    this.drafts = this.drafts.filter(h => h._id != id)
  }

}
