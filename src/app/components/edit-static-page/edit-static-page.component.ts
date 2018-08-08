import { Component, OnInit } from '@angular/core';
import { StaticPagesService } from '../../services/static-pages.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-edit-static-page',
  templateUrl: './edit-static-page.component.html',
  styleUrls: ['./edit-static-page.component.css']
})
export class EditStaticPageComponent implements OnInit {

  title:String;
  editorContent:String;
  articleId:number;
  article:any;
  token:string = localStorage.getItem('token');

  public options: Object = {
    height: 300,
    placeholderText: 'Enter article body here',
    immediateAngularModelUpdate: true,
    imageUploadURL: this.authService.returnIp() + 'static-pages/images',
    requestHeaders: {authorization: this.token},
    imageUploadMethod: 'POST',
    events: {'froalaEditor.contentChanged': (e, editor) => {
      this.updateArticle();
    }}
  }

  constructor(
    private sp: StaticPagesService,
    private flashMessage: FlashMessagesService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    //saves the article id from the route to the id variable
    this.articleId = this.route.snapshot.params['id'];

    //get the article from the database
    this.sp.getArticle(this.articleId).subscribe(data => {
      this.article = data;
      this.title = data.title;
      this.editorContent = data.body;
    })
  }

  //opens a new tab with the article preview in it
  openWindow(id){
    window.open('static-pages/preview/' + id)
  }

  //updates the article in the database
  updateArticle(){
    let id = this.articleId
    let article = {
      title: this.title,
      body: this.editorContent
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


}
