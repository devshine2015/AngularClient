import { Component, OnInit } from '@angular/core';
import { StaticPagesService } from '../../services/static-pages.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-new-static-page',
  templateUrl: './new-static-page.component.html',
  styleUrls: ['./new-static-page.component.css']
})
export class NewStaticPageComponent implements OnInit {

  title:String;
  editorContent:String;
  articleExists:boolean = false;
  articleId:number;
  token:string = localStorage.getItem('token');


  public options: Object = {
    height: 300,
    placeholderText: 'Enter article body here',
    immediateAngularModelUpdate: true,
    imageUploadURL: this.authService.returnIp() + 'static-pages/images',
    requestHeaders: {authorization: this.token},
    imageUploadMethod: 'POST',
    events: {'froalaEditor.contentChanged': (e, editor) => {
      this.keypress();
    }}
  }

  constructor(
    private sp: StaticPagesService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  //if the article doesn't exist, creates it, if it does exist, updates the article
  keypress(){
    if(!this.articleExists){
      this.createArticle();

      this.articleExists = true
    } else {

      this.updateArticle();
    }
  }

  //creates the article in the database
  createArticle(){
    let article = {
      title: this.title,
      articleBody: this.editorContent
    }

    this.sp.createArticle(article).subscribe(data => {
      this.articleId = data.articleId
    },
    err => {
      console.log(err);
    });
  }

  //updates the article in the database
  updateArticle(){
    let id = this.articleId
    let article = {
      title: this.title,
      body: this.editorContent,
    }

    this.sp.editArticle(article, id).subscribe(data => {
      if(data.success){
      } else {
        this.flashMessage.show('Something went wrong on the server', {cssClass: 'alert-danger', timeout: 5000})
      }
    },
    err => {
      console.log(err);
    });
  }

  //opens a new tab with the article preview in it
  openWindow(id){
    window.open('static-pages/preview/' + id)
  }


}
