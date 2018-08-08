import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {ShowService} from '../../services/show.service';
import {UserService} from '../../services/user.service';
import {DateTimeService} from '../../services/date-time.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';
import { Http, Headers} from '@angular/http';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import * as moment from 'moment';

const Moment: any = (<any>moment).default || moment;



@Component({
  selector: 'app-new-show',
  templateUrl: './new-show.component.html',
  styleUrls: ['./new-show.component.css']
})
export class NewShowComponent implements OnInit {

  public myForm: FormGroup;

  descriptionContent:any;
  startDate:any;
  endDate:any;
  days: IMultiSelectOption[];
  genres: Array<string> = ['Alt-rock', 'RPM', 'Jazz', 'Metal', 'Hip-Hop', 'World', 'Talk', 'Specialty'];
  durations: Array<string> = ['1/2 hr', '1 hr', '2 hr', '3 hr'];
  types: Array<string> = ['Weekly', 'Bi-weekly', 'One-off'];
  hours: Array<string> = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
  minutes: Array<string> = ['00', '30'];
  djs: any;
  name: string;
  bPath: string;
  bannerPath: string;
  tPath: string;
  thumbnailPath: string;
  token: string = localStorage.getItem('token');
  oneOff: boolean = false;
  public uploader1:FileUploader = new FileUploader({url: this.authService.returnIp() + 'shows/images/thumbnail', authToken: this.token});
  public uploader2:FileUploader = new FileUploader({url: this.authService.returnIp() + 'shows/images/show-banner', authToken: this.token});

  public options: Object = {
    height: 300,
    placeholderText: 'Enter article body here',
    immediateAngularModelUpdate: true,
  }


  constructor(
    private flashMessage:FlashMessagesService,
    private authService:AuthService,
    private http:Http,
    private showService:ShowService,
    private userService:UserService,
    private _fb:FormBuilder,
    private dateTime:DateTimeService,
    private router:Router

  ) { }

  ngOnInit() {
    this.userService.getUsersByRole('dj')
      .subscribe(data => {
        this.djs = data;
      })

    this.days = this.dateTime.makeIntoObjects(this.dateTime.days);

    //initializes the reactive form
    this.myForm = this._fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      djs: this._fb.array([this.initDj()]),
      startDays: [[], [Validators.required]],
      genre: [''],
      startHour: ['', [Validators.required]],
      startMinute: ['', [Validators.required]],
      endDays: [[], [Validators.required]],
      endHour: ['', [Validators.required]],
      endMinute: ['', [Validators.required]],
      timeString: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: [''],
      tags: [[]],
      placeholder: [false, [Validators.required]]

    })
  }

  //adds a dj to the array of djs
  initDj(){
    return this._fb.group({
      _id : []
    });
  }

  //adds a dj to the form array
  addDj() {
    const control = <FormArray>this.myForm.controls['djs'];
    control.push(this.initDj());
  }

  //removes a dj from the array
  removeDj(i: number) {
      const control = <FormArray>this.myForm.controls['djs'];
      control.removeAt(i);
  }


  //uploads image to the server, then saves the path to the article to thumnbnailPath variable
  uploadThumbnail(){

    this.uploader1.uploadAll();
    this.uploader1.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            let r = JSON.parse(response)
            this.thumbnailPath =  r.path
            this.tPath = r.path
            this.flashMessage.show('Thumbnail has been uploaded', {cssClass: 'alert-success', timeout: 5000})

        };
  }

    //uploads image to the server, then saves the path to the article to thumnbnailPath variable
    uploadBanner(){

      this.uploader2.uploadAll();
      this.uploader2.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
              let r = JSON.parse(response)
              this.bannerPath =  r.path;
              this.bPath = r.path;
              this.flashMessage.show('Banner has been uploaded', {cssClass: 'alert-success', timeout: 5000})

          };
    }

    //saves show to the database
    showSubmit(){
      let t = this.myForm.controls['tags'].value;
      var ta = []
      let len = t.length
      for(var i = 0; i < len; i++){
        ta.push(t[i].value);
      }
      const show = {
        name: this.myForm.controls['name'].value,
        type: this.myForm.controls['type'].value,
        timeString: this.myForm.controls['timeString'].value,
        djs: this.myForm.controls['djs'].value,
        description: this.descriptionContent,
        startDate: this.myForm.controls['startDate'].value,
        endDate: this.myForm.controls['endDate'].value,
        startDays: this.myForm.controls['startDays'].value,
        endDays: this.myForm.controls['endDays'].value,
        startHour: this.myForm.controls['startHour'].value,
        endHour: this.myForm.controls['endHour'].value,
        startMinute: this.myForm.controls['startMinute'].value,
        endMinute: this.myForm.controls['endMinute'].value,
        genre: this.myForm.controls['genre'].value,
        duration: this.myForm.controls['duration'].value,
        placeholder: this.myForm.controls['placeholder'].value,
        tags: ta,
        thumbnailPath: this.tPath,
        bannerPath: this.bPath
      }

      if (this.myForm.status == 'INVALID') {
        alert('Please fill in all fields!');
        console.log(this.myForm.value)
      } else {
        let headers = this.authService.setHeaders();
        let ep = this.authService.prepEndpoint('http://localhost:3000/shows/create');
        return this.http.post(ep, show, {headers: headers})
          .map(res => res.json())
          .subscribe(data => {
            if(data.success){
              this.flashMessage.show("Show created successfully", {cssClass: 'alert-success', timeout: 5000})
              this.router.navigate(['/manage-shows'])
            } else {
              this.flashMessage.show("Something went wrong on the server", {cssClass: 'alert-danger', timeout: 5000})

            }
          });
      }


    }

}
