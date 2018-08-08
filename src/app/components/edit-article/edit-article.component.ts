import { Component, OnInit, EventEmitter } from '@angular/core';
import {GetRolesService} from '../../services/get-roles.service';
import {AuthService} from '../../services/auth.service';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';
import * as moment from 'moment';

const Moment: any = (<any>moment).default || moment;


@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  id:number;
  article:any;
  title:String;
  writer:String;
  tagline:String;
  editorContent:String;
  editorContent2:String;
  editorContent3:String;
  thumbnailPath:String;
  image1Path:String;
  image2Path:String;
  image3Path:String;
  img1Path:String;
  img2Path:String;
  img3Path:String;
  previewContent:String;
  publish_on:any;
  unpublish_on:any;
  token:string = localStorage.getItem('token')
  public uploader:FileUploader = new FileUploader({url:'http://localhost:3000/articles/thumbnail', authToken: this.token});
  public uploader1:FileUploader = new FileUploader({url:'http://localhost:3000/articles/image1', authToken: this.token});
  public uploader2:FileUploader = new FileUploader({url:'http://localhost:3000/articles/image2', authToken: this.token});
  public uploader3:FileUploader = new FileUploader({url:'http://localhost:3000/articles/image3', authToken: this.token});

  public options: Object = {
    height: 300,
    placeholderText: 'Enter article body here',
    immediateAngularModelUpdate: true,
    imageUploadURL: 'http://localhost:3000/articles/images',
    requestHeaders: {
      authorization: this.token
    },
    imageUploadMethod: 'POST',
    events: {'froalaEditor.contentChanged': (e, editor) => {
      this.updateArticle();
    }}
  }

  public options2: Object = {
    height: 75,
    placeholderText: 'Enter article preview here',
    immediateAngularModelUpdate:true,
    charCounterMax: 140,
    events: {'foalaEditor.contentChanged': (e, editor) => {
      this.updateArticle();
    }}
  }

  constructor(
    private authService:AuthService,
    private http:Http,
    private rolesService:GetRolesService,
    private route:ActivatedRoute,
    private flashMessage:FlashMessagesService,
    private router:Router,
  ) {}

  ngOnInit() {
    //saves the article id from the route to the id variable
    this.id = this.route.snapshot.params['id'];

    //retreives the article and it's componennt parts from the database
    this.getArticle(this.id).subscribe( data => {
      this.article = data;
      this.title = data.title;
      this.writer = data.writer;
      this.tagline = data.tagline;
      this.editorContent = data.articleBody;
      this.editorContent2 = data.articleBody2;
      this.editorContent3 = data.articleBody3;
      this.previewContent = data.preview;

      if (data.thumbnailPath){
        this.thumbnailPath = 'http://localhost:3000/' + data.thumbnailPath;
      }
      if (data.image1Path){
        this.image1Path = 'http://localhost:3000/' + data.image1Path;
        this.img1Path = data.image1Path;
      }

      if (data.image2Path){
        this.image2Path = 'http://localhost:3000/' + data.image2Path;
        this.img2Path = data.image2Path;
      }

      if (data.image3Path){
        this.image3Path = 'http://localhost:3000/' + data.image3Path;
        this.img3Path = data.image3Path;

      }

      this.publish_on = moment(data.publish_on);
      this.unpublish_on = moment(data.unpublish_on)
    });

    //retrieves the user's roles from the database
    this.rolesService.setRoles();
  }

  //gets article from database
  getArticle(id){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/articles/get/' + id);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

  // uploads image to server and saves path to the image in thumnbnailPath variable
  uploadImage(){
    let article = {
      articleId: this.id
    }

    this.prepareUploader(article);
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            let r = JSON.parse(response)
            this.thumbnailPath = 'http://localhost:3000/' + r.path
            this.flashMessage.show('Thumbnail has been uploaded', {cssClass: 'alert-success', timeout: 5000})

        };
  }

  //uploads image to the server, then saves the path to the article to image1Path variable
  uploadImage1(){
    let article = {
      articleId: this.id
    }
    this.prepareUploader1(article);
    this.uploader1.uploadAll();
    this.uploader1.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            let r = JSON.parse(response)
            this.image1Path = 'http://localhost:3000/' + r.path
            this.flashMessage.show('Image 1 has been uploaded', {cssClass: 'alert-success', timeout: 5000})

        };
    }

  //uploads image to the server, then saves the path to the article to image2Path variable
  uploadImage2(){
    let article = {
      articleId: this.id
    }
    this.prepareUploader2(article);
    this.uploader2.uploadAll();
    this.uploader2.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            let r = JSON.parse(response)
            this.image2Path = 'http://localhost:3000/' + r.path
            this.flashMessage.show('Image 2 has been uploaded', {cssClass: 'alert-success', timeout: 5000})

        };
    }

  //uploads image to the server, then saves the path to the article to image1Path variable
  uploadImage3(){
    let article = {
      articleId: this.id
    }
    this.prepareUploader3(article);
    this.uploader3.uploadAll();
    this.uploader3.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            let r = JSON.parse(response)
            this.image3Path = 'http://localhost:3000/' + r.path
            this.flashMessage.show('Image 3 has been uploaded', {cssClass: 'alert-success', timeout: 5000})

        };
    }


  //adds multipart fields to file upload
  prepareUploader(data) {
  this.uploader.onBuildItemForm = (item, form) => {
  for (let key in data) {
  form.append(key, data[key])}};
  }

  prepareUploader1(data) {

  this.uploader1.onBuildItemForm = (item, form) => {
  for (let key in data) {
  form.append(key, data[key])}};
  }

  prepareUploader2(data) {

  this.uploader2.onBuildItemForm = (item, form) => {
  for (let key in data) {
  form.append(key, data[key])}};
  }

  prepareUploader3(data) {

  this.uploader3.onBuildItemForm = (item, form) => {
  for (let key in data) {
  form.append(key, data[key])}};
  }

  //updates article in the database
  updateArticle(){
    let id = this.id
    var article = {}
    if (this.publish_on && this.unpublish_on) {
       article = {
        title: this.title,
        writer: this.writer,
        tagline: this.tagline,
        articleBody: this.editorContent,
        articleBody2: this.editorContent2,
        articleBody3: this.editorContent3,
        preview: this.previewContent,
        publish_on: this.publish_on,
        unpublish_on: this.unpublish_on
      }
    } else if (this.publish_on && !this.unpublish_on) {
       article = {
        title: this.title,
        writer: this.writer,
        tagline: this.tagline,
        articleBody: this.editorContent,
        articleBody2: this.editorContent2,
        articleBody3: this.editorContent3,
        preview: this.previewContent,
        publish_on: this.publish_on
      }
    } else if (!this.publish_on && this.unpublish_on) {
       article = {
        title: this.title,
        writer: this.writer,
        tagline: this.tagline,
        articleBody: this.editorContent,
        articleBody2: this.editorContent2,
        articleBody3: this.editorContent3,
        preview: this.previewContent,
        unpublish_on: this.unpublish_on
      }
    } else {
      article = {
        title: this.title,
        writer: this.writer,
        tagline: this.tagline,
        articleBody: this.editorContent,
        articleBody2: this.editorContent2,
        articleBody3: this.editorContent3,
        preview: this.previewContent
      }
    }

    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/articles/edit/' + id);
    return this.http.put(ep, article, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
      },
    err => {
      console.log(err);
    });

  }

  //submits an article for review
  articleSubmit(){
  if (this.article.status == 'draft') {
    let id = this.id
    let status = {
      status: 'review'
    }
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/articles/edit/status/' + id);
    return this.http.put(ep, status, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        if (data.success) {
          this.flashMessage.show('Article has been submitted', {cssClass: 'alert-success', timeout: 5000});
          this.router.navigate(['my-drafts'])
        }
      },
      err => {
        console.log(err);
      })


    } else {
      this.flashMessage.show('Article is not a draft', {cssClass: 'alert-danger', timeout: 5000});
     }

  }

  //submits an article for review
  publishArticle(){
  if (this.article.status == 'review' || 'unpublished') {
    let id = this.id
    let status = {
      status: 'published'
    }
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/articles/edit/status/' + id);
    return this.http.put(ep, status, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        if (data.success) {
          this.flashMessage.show('Article has been published', {cssClass: 'alert-success', timeout: 5000});
          this.router.navigate(['articles/review'])
        } else {
          this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 5000});
        }
      },
      err => {
        console.log(err);
      })
    }
  }

  deleteImage1(){
    this.image1Path = null;
    let b = {
      articleId: this.id,
      path: this.img1Path
    }

    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/articles/delete-image1');
    return this.http.post(ep, b, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        if (data.success) {
          this.flashMessage.show('Image has been deleted', {cssClass: 'alert-success', timeout: 5000});
        } else {
          this.flashMessage.show('Something went wrong', {cssClass: 'alert-success', timeout: 5000})
        }
      })
  }

  deleteImage2(){
    this.image2Path = null;
    let b = {
      articleId: this.id,
      path: this.img2Path
    }

    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/articles/delete-image2');
    return this.http.post(ep, b, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        if (data.success) {
          this.flashMessage.show('Image has been deleted', {cssClass: 'alert-success', timeout: 5000});
        } else {
          this.flashMessage.show('Something went wrong', {cssClass: 'alert-success', timeout: 5000})
        }
      })
  }

  deleteImage3(){
    this.image3Path = null;
    let b = {
      articleId: this.id,
      path: this.img3Path
    }

    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/articles/delete-image3');
    return this.http.post(ep, b, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        if (data.success) {
          this.flashMessage.show('Image has been deleted', {cssClass: 'alert-success', timeout: 5000});
        } else {
          this.flashMessage.show('Something went wrong', {cssClass: 'alert-success', timeout: 5000})
        }
      })
  }

  //unpublishes a published article
  unpublishArticle(){
    let id = this.id
    let status = {
      status: 'unpublished'
    }

    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/articles/edit/status/' + id);
    return this.http.put(ep, status, {headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        if (data.success) {
          this.flashMessage.show('Article has been unpublished', {cssClass: 'alert-success', timeout: 5000});
          this.router.navigate(['articles/review'])
        } else {
          this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 5000});
        }
      },
      err => {
        console.log(err);
      });
  }

  //opens a new tab with the article preview in it
  openWindow(id){
    window.open('articles/preview/' + id)
  }

}
