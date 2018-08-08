import { Component, OnInit } from '@angular/core';
import { AdService } from '../../services/ad.service';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-new-ad',
  templateUrl: './new-ad.component.html',
  styleUrls: ['./new-ad.component.css']
})
export class NewAdComponent implements OnInit {

  title:String;
  slot:String;
  imagePath:String;
  link:String;
  originalPath:String;

  token:string = localStorage.getItem('token');
  public uploader:FileUploader = new FileUploader({url: this.authService.returnIp() + 'ads/image', authToken: this.token});


  constructor(
    private as: AdService,
    private flashMessage:FlashMessagesService,
    private router:Router,
    private authService: AuthService

  ) { }

  ngOnInit() {
  }

  //uploads image to the server, then saves the path to the article to thumnbnailPath variable
  uploadImage(){

    let ad = {
      slot: this.slot
    }
    this.prepareUploader(ad);
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            let r = JSON.parse(response);
            this.imagePath = r.path;
            this.originalPath = r.path;
            this.flashMessage.show('Image has been uploaded', {cssClass: 'alert-success', timeout: 5000});

        };
  }

  //adds multipart data to file upload
  prepareUploader(data) {

  this.uploader.onBuildItemForm = (item, form) => {
  for (let key in data) {
  form.append(key, data[key])}};
  }

  //deletes an image from the server
  deleteImage(){
    this.as.deleteImage(this.originalPath).subscribe(data => {
      if(data.success){
        this.originalPath = null;
        this.imagePath = null;
      }
    }, err => {
      console.log(err);
      return false;
    })
  }

  save(){
    let ad = {
      title: this.title,
      link: this.link,
      imagePath: this.imagePath,
      slot: this.slot
    }

    this.as.saveAd(ad).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Ad has been successfully saved', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/manage-ads']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000})
      }
    }, err => {
      console.log(err);
      return false;
    })
  }

}
