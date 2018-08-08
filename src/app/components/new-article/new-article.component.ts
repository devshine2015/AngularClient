import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import { Http, Headers} from '@angular/http';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css']
})
export class NewArticleComponent implements OnInit {

  title:String
  writer:String;
  tagline:String;
  editorContent:String;
  editorContent2:String;
  editorContent3:String;
  previewContent:String;
  articleExists:boolean = false;
  articleId:String;
  thumbnailPath:String;
  image1Path:String;
  image2Path:String;
  image3Path:String;
  img1Path:String;
  img2Path:String;
  img3Path:String;
  token:string = localStorage.getItem('token');
  public uploader:FileUploader = new FileUploader({url:'http://localhost:3000/articles/thumbnail', authToken: this.token});
  public uploader1:FileUploader = new FileUploader({url:'http://localhost:3000/articles/image1', authToken: this.token});
  public uploader2:FileUploader = new FileUploader({url:'http://localhost:3000/articles/image2', authToken: this.token});
  public uploader3:FileUploader = new FileUploader({url:'http://localhost:3000/articles/image3', authToken: this.token});

  public options: Object = {
    height: 300,
    placeholderText: 'Enter article body here',
    immediateAngularModelUpdate: true,
    imageUploadURL: 'http://localhost:3000/articles/images',
    requestHeaders: {authorization: this.token},
    imageUploadMethod: 'POST',
    events: {'froalaEditor.contentChanged': (e, editor) => {
      this.keypress();
    }}
  }

  public options2: Object = {
    height: 75,
    placeholderText: 'Enter article preview here',
    immediateAngularModelUpdate:true,
    charCounterMax: 140,
    events: {'foalaEditor.contentChanged': (e, editor) => {
      this.keypress();
    }}
  }

  constructor(
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private http:Http,
    private router:Router
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

//submits the article for review
  articleSubmit(){
  let id = this.articleId
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
      }
    },
    err => {
      console.log(err);
    })

  }

//creates the article in the database
  createArticle(){
    let article = {
      title: this.title,
      writer: this.writer,
      tagline: this.tagline,
      articleBody: this.editorContent,
      articleBody2: this.editorContent2,
      articleBody3: this.editorContent3,
      preview: this.previewContent
    }
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/articles/create');
    return this.http.post(ep, article,{headers: headers})
      .map(res => res.json())
      .subscribe(data => {
        this.articleId = data.articleId
      },
    err => {
      console.log(err);
    });
  }

//uploads image to the server, then saves the path to the article to thumnbnailPath variable
uploadImage(){
  let article = {
    articleId: this.articleId
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
    articleId: this.articleId
  }
  this.prepareUploader1(article);
  this.uploader1.uploadAll();
  this.uploader1.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
          let r = JSON.parse(response)
          this.image1Path = 'http://localhost:3000/' + r.path;
          this.img1Path = r.path;
          this.flashMessage.show('Image 1 has been uploaded', {cssClass: 'alert-success', timeout: 5000});

      };
  }

//uploads image to the server, then saves the path to the article to image2Path variable
uploadImage2(){
  let article = {
    articleId: this.articleId
  }
  this.prepareUploader2(article);
  this.uploader2.uploadAll();
  this.uploader2.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
          let r = JSON.parse(response);
          this.image2Path = 'http://localhost:3000/' + r.path;
          this.img2Path = r.path;
          this.flashMessage.show('Image 2 has been uploaded', {cssClass: 'alert-success', timeout: 5000});

      };
  }

//uploads image to the server, then saves the path to the article to image1Path variable
uploadImage3(){
  let article = {
    articleId: this.articleId
  }
  this.prepareUploader3(article);
  this.uploader3.uploadAll();
  this.uploader3.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
          let r = JSON.parse(response)
          this.image3Path = 'http://localhost:3000/' + r.path
          this.img3Path = r.path;
          this.flashMessage.show('Image 3 has been uploaded', {cssClass: 'alert-success', timeout: 5000})

      };
}

deleteImage1(){
  this.image1Path = null;
  let b = {
    articleId: this.articleId,
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
    articleId: this.articleId,
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
    articleId: this.articleId,
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

//adds multipart data to file upload
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

//updates the article in the database
updateArticle(){
  let id = this.articleId
  let article = {
    title: this.title,
    writer: this.writer,
    tagline: this.tagline,
    articleBody: this.editorContent,
    articleBody2: this.editorContent2,
    articleBody3: this.editorContent3,
    preview: this.previewContent
  }

  console.log(article);
  let headers = this.authService.setHeaders();
  let ep = this.authService.prepEndpoint('http://localhost:3000/articles/edit/' + id);
  return this.http.put(ep, article, {headers: headers})
    .map(res => res.json())
    .subscribe(data => {
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
    window.open('articles/preview/' + id)
  }

}
