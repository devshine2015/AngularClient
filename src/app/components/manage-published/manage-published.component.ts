import { Component, OnInit } from '@angular/core';
import {GetRolesService} from '../../services/get-roles.service';
import {AuthService} from '../../services/auth.service';
import {Http, Headers} from '@angular/http';
import {DateToStringService} from '../../services/date-to-string.service';
import {FlashMessagesService} from 'angular2-flash-messages';



@Component({
  selector: 'app-manage-published',
  templateUrl: './manage-published.component.html',
  styleUrls: ['./manage-published.component.css']
})
export class ManagePublishedComponent implements OnInit {
  articles:any;
  articlesTemp:any;
  queryUsername:String = "";
  queryTitle:String ="";

  constructor(
    private rolesService:GetRolesService,
    private authService:AuthService,
    private http:Http,
    private dateString:DateToStringService,
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

  //retrieves all published articles from the api
  getArticles(){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/articles/get-published');
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

  //changes the spotlight status of an article
  spotlight(e, article){
    if(e.target.checked){
      let spotlight = {
        spotlight: true
      }
      let headers = this.authService.setHeaders();
      let ep = this.authService.prepEndpoint('http://localhost:3000/articles/spotlight/' + article._id);
      return this.http.put(ep, spotlight, {headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          if (data.success){
            console.log("Article spotlighted")
          } else {
            console.log("Failed to change status")
          }
        });
    } else if (!e.target.checked){
      let spotlight = {
        spotlight: false
      }
      let headers = this.authService.setHeaders();
      let ep = this.authService.prepEndpoint('http://localhost:3000/articles/spotlight/' + article._id);
      return this.http.put(ep, spotlight, {headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          if (data.success){
            console.log("Article removed from spotlight")
          } else {
            console.log("Failed to change status")
          }
        });
    }
  }
  //highlihts the article
  highlight(e, article){
    if (e.target.checked){
      let highlighted = {
        highlighted: true
      }

      let headers = this.authService.setHeaders();
      let ep = this.authService.prepEndpoint('http://localhost:3000/articles/highlight/' + article._id);
      return this.http.put(ep, highlighted, {headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          if (data.success){
            console.log("Article highlighted")
          } else {
            console.log("Failed to change status")
          }
        });
    } else if (!e.target.checked){
      let highlighted = {
        highlighted: false
      }
      let headers = this.authService.setHeaders();
      let ep = this.authService.prepEndpoint('http://localhost:3000/articles/highlight/' + article._id);
      return this.http.put(ep, highlighted, {headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          if (data.success){
            console.log("Article removed from highlights")
          } else {
            console.log("Failed to change status")
          }
        });
    }

  }

  inMagazine(e, article){
    if(e.target.checked){
      let magazine = {
        magazine: true
      }

      let headers = this.authService.setHeaders();
      let ep = this.authService.prepEndpoint('http://localhost:3000/articles/magazine/' + article._id);
      return this.http.put(ep, magazine, {headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          if (data.success){
            console.log("Article added to the magazine")
          } else {
            console.log("Failed to change status")
          }
        });
    } else if (!e.target.checked){
      let magazine = {
        magazine: false
      }

      let headers = this.authService.setHeaders();
      let ep = this.authService.prepEndpoint('http://localhost:3000/articles/magazine/' + article._id);
      return this.http.put(ep, magazine, {headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          if (data.success){
            console.log("Article is now in the magazine")
          } else {
            console.log("Failed to change status")
          }
        });
    }
  }



  inNandE(e, article){
    if(e.target.checked){
      let newsAndEvents = {
        newsAndEvents: true
      }

      let headers = this.authService.setHeaders();
      let ep = this.authService.prepEndpoint('http://localhost:3000/articles/news-and-events/' + article._id);
      return this.http.put(ep, newsAndEvents, {headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          if (data.success){
            console.log("Article will now appear in the news and events")
          } else {
            console.log("Failed to change status")
          }
        });
    } else if (!e.target.checked){
      let newsAndEvents = {
        newsAndEvents: false
      }

      let headers = this.authService.setHeaders();
      let ep = this.authService.prepEndpoint('http://localhost:3000/articles/news-and-events/' + article._id);
      return this.http.put(ep, newsAndEvents, {headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          if (data.success){
            console.log("Article removed from the news and events")
          } else {
            console.log("Failed to change status")
          }
        });
    }

  }

  inVideo(e, article){
    if(e.target.checked){
      let video = {
        video: true
      }

      let headers = this.authService.setHeaders();
      let ep = this.authService.prepEndpoint('http://localhost:3000/articles/video/' + article._id);
      return this.http.put(ep, video, {headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          if (data.success){
            console.log("Article will now appear in the videos section")
          } else {
            console.log("Failed to change status")
          }
        });
    } else if (!e.target.checked){
      let video = {
        video: false
      }

      let headers = this.authService.setHeaders();
      let ep = this.authService.prepEndpoint('http://localhost:3000/articles/video/' + article._id);
      return this.http.put(ep, video, {headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          if (data.success){
            console.log("Article will no longer appear in the videos section")
          } else {
            console.log("Failed to change status")
          }
        });
    }
  }

  unpublishArticle(id){
      let status = {
        status: 'unpublished'
      }
      let headers = this.authService.setHeaders();
      let ep = this.authService.prepEndpoint('http://localhost:3000/articles/edit/status/' + id);
      return this.http.put(ep, status, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          if (data.success) {
            this.filterArticles(id);
            this.flashMessage.show('Article has been unpublished', {cssClass: 'alert-success', timeout: 5000});

          } else {
            this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 5000});
          }
        },
        err => {
          console.log(err);
        })
  }

  //returns the articles that match the username query
  filterUsername(){
  this.articlesTemp =  this.articles.filter( (el) => {
      var result="";
        for(var key in el){
          if(el.author.username.toLowerCase().indexOf(this.queryUsername.toLowerCase()) > -1){
            result+= el[key];
          }
        }
        return result

    }
  )};

  //returns the articles that match the title query
  filterTitles(){
  this.articlesTemp =  this.articles.filter( (el) => {
      var result="";
        for(var key in el){
          if(el.title.toLowerCase().indexOf(this.queryTitle.toLowerCase()) > -1){
            result+= el[key];
          }
        }
        return result

    }
  )};

  //if there is no query, returns the full list of users, otherwise returns the filtered list of users
    getData(){
      if(this.queryUsername !== "" || this.queryTitle !== ""){
        return this.articlesTemp;
      }else{
        return this.articles;
      }
    }

  //opens a new tab with the article preview in it
  openWindow(id){
    window.open('articles/preview/' + id)
  }
}
