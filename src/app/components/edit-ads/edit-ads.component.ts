import { Component, OnInit } from '@angular/core';
import { AdService } from '../../services/ad.service';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-edit-ads',
  templateUrl: './edit-ads.component.html',
  styleUrls: ['./edit-ads.component.css']
})
export class EditAdsComponent implements OnInit {

  title:String;
  slot:String;
  imagePath:String;
  link:String;
  originalPath:String;
  ad:any;
  id:number = this.route.snapshot.params['id'];

  token:string = localStorage.getItem('token');
  public uploader:FileUploader = new FileUploader({url: this.authService.returnIp() + 'ads/image', authToken: this.token});



  constructor(
    private as: AdService,
    private flashMessage:FlashMessagesService,
    private route:ActivatedRoute,
    private router:Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.as.getAd(this.id).subscribe(data => {
      this.ad = data;
      this.title = data.title;
      this.link = data.link;
      this.imagePath = data.imagePath;
      this.slot = data.slot;
    }, err => {
      console.log(err);
      return false;
    })
  }

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

    this.as.editAd(this.id, ad).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Ad has been successfully saved', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/home']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000})
      }
    }, err => {
      console.log(err);
      return false;
    })
  }

}
