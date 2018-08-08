import { Component, OnInit } from '@angular/core';
import {ShowService} from '../../services/show.service';
import {AuthService} from '../../services/auth.service';
import {EpisodeService} from '../../services/episode.service';
import {DateTimeService} from '../../services/date-time.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import * as moment from 'moment';



const Moment: any = (<any>moment).default || moment;



@Component({
  selector: 'app-edit-episode',
  templateUrl: './edit-episode.component.html',
  styleUrls: ['./edit-episode.component.css']
})
export class EditEpisodeComponent implements OnInit {

  public myForm: FormGroup;

  public options: Object = {
    height: 100,
    charCounterMax: 250,
    placeholderText: 'Enter episode description here'
  }

  showId:number;
  show:any;
  episodeId:number;
  episode:any;
  editorContent:string;
  canconPercent:string = '0';
  newPercent:string = '0';
  socan:boolean = false;
  types:Array<string> = ['Talk', 'News', 'Ad', 'Show Promo', 'Station Id'];
  contentTypes:Array<string> = ['CanCon', 'LGBTQ', 'Indigenous'];
  date:Date;
  minDate: Date = new Date(Date.now());
  maxDate: Date = new Date(Date.now());
  endDate: Date;
  startHour:number;
  startMinute:number;
  disabledDates:Array<Date>;


  constructor(
    private authService:AuthService,
    private showService:ShowService,
    private dateTime:DateTimeService,
    private flashMessage:FlashMessagesService,
    private episodeService:EpisodeService,
    private route:ActivatedRoute,
    private router:Router,
    private _fb:FormBuilder,


  ) { }

  ngOnInit() {
    this.episodeId = this.route.snapshot.params['id'];

    this.episodeService.getCanconPercent(this.episodeId).subscribe(data => {
      if(data[0]){
        this.canconPercent = Math.floor(data[0].CanconPercent * 100).toString();
      }
    }, err =>{
      console.log(err);
      return false;
    });
    this.episodeService.getNewPercent(this.episodeId).subscribe(data => {
      if (data[0]){
        this.newPercent = Math.floor(data[0].newPercent * 100).toString();
      }
    }, err =>{
      console.log(err);
      return false;
    })

    this.myForm = new FormGroup({
      tracks: this._fb.array([])
    })

    this.episodeService.getEpisodeById(this.episodeId).subscribe(data => {
      this.episode = data;
      this.date = data.airDate;
      this.socan = data.socan;
      this.date = new Date(new Date(this.date).setHours(new Date(this.date).getHours()))
      this.showId = data.show
      this.startHour = this.date.getHours();
      this.startMinute = this.date.getMinutes();
      this.showService.getShowById(this.showId).subscribe(data => {
        this.show = data
        this.disabledDates = this.disableDates(this.show)
        this.startHour = this.dateTime.getStartHour(this.show);
        this.startMinute = this.dateTime.getStartMinute(this.show)

      },
      err => {
        console.log(err)
        return false
      });

      this.pV(this.episode);
      if (data.body){
        this.editorContent = data.body;
      }
    },
    err => {
      console.log(err);
      return false
    });

    this.minDate.setDate(this.minDate.getDate() - 8)
    this.maxDate.setMonth(this.minDate.getMonth() + 1);


  }

  pV(episode){

    let e = episode.plays;
    Object.keys(e).forEach(key => {
      const control = <FormArray>this.myForm.controls['tracks'];
      control.push(this.initTrack());

      var con = control['controls'][key]['controls']
      con['startDate'].patchValue(this.convertToString(new Date(e[key].startTime)));
      con['startSecond'].patchValue(new Date(e[key].startTime).getSeconds());
      con['endDate'].patchValue(this.convertToString(new Date(e[key].endTime)));
      con['endSecond'].patchValue(new Date(e[key].endTime).getSeconds());
      con['artist'].patchValue(e[key].artist);
      con['title'].patchValue(e[key].title);
      con['index'].patchValue(e[key].index);
      con['saved'].patchValue(true);
      con['classification'].patchValue(e[key].classification);
      con['canCon'].patchValue(e[key].canCon);
      con['lgbtq'].patchValue(e[key].lgbtq);
      con['new'].patchValue(e[key].new);
      con['indigenous'].patchValue(e[key].indigenous);

      if(this.socan){
        con['composer'].patchValue(e[key].composer);
      }
    });
  }

  convertToString(date){
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let u = date.getMinutes();

    if (u < 10) {
      u = "0" + u.toString()
    }

    return y + '/' + m + '/' + d + ' ' + h + ':' + u
  }

  disableDates(show){
    var dates = []
    for (var d = new Date(this.minDate); d <= new Date(this.maxDate); new Date(d.setDate(d.getDate() + 1))){

      if (show.days.indexOf(d.getDay()) === -1){
        let s = d.getFullYear().toString();
        let f = d.getDate().toString();
        let q = (d.getMonth() +1).toString();
      dates.push(new Date(s + '/' + q + '/' + f));
      }
    }

    return dates
  }

  saveBody(){
    let body = this.editorContent;
    this.episodeService.saveBody(body, this.episodeId).subscribe(data => {
      if (data.success){
        this.flashMessage.show('Episode description saved', {cssClass: 'alert-success', timeout: 5000})
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 5000})
      }
    },
    err => {
      console.log(err)
      return false
    })
  }

  setHours(){
    this.date.setHours(this.startHour);
    this.date.setMinutes(this.startMinute);
  }

  initTrack(){
    if(!this.socan){
      return this._fb.group({
        index:[],
        saved: [false, [Validators.required]],
        classification: ['Theme', [Validators.required]],
        startDate: [null, [Validators.required]],
        startSecond: [null, [Validators.required]],
        endDate:[null, [Validators.required]],
        endSecond:[null, [Validators.required]],
        composer:[null, [Validators.required]],
        canCon:[false, [Validators.required]],
        lgbtq:[false, [Validators.required]],
        indigenous:[false, [Validators.required]],
        new:[false, [Validators.required]],
        artist: [],
        title: []
      })
    } else {
      return this._fb.group({
        index: [],
        saved: [false, [Validators.required]],
        classification: ['Theme', [Validators.required]],
        startDate: [null, [Validators.required]],
        startSecond: [null, [Validators.required]],
        endDate:[null, [Validators.required]],
        endSecond:[null, [Validators.required]],
        composer:[null, [Validators.required]],
        canCon:[false, [Validators.required]],
        lgbtq:[false, [Validators.required]],
        new:[false, [Validators.required]],
        indigenous:[false, [Validators.required]],
        artist: [],
        title: []
      });
    }
  }

  removeTrack(i: number) {

    this.episodeService.deleteTrack(i, this.episodeId).subscribe(data =>{
      if(data.success){
        // remove track from the list
        const control = <FormArray>this.myForm.controls['tracks'];
        control.removeAt(i);
      } else {
        this.flashMessage.show('Something went wrong, did you try to delete a track that has not been saved yet?', {cssClass: 'alert-danger', timeout: 5000})
      }
    })

  }

  newTrack(){
    const control = <FormArray>this.myForm.controls['tracks'];
    control.push(this.initTrack());

    let len = this.myForm.controls['tracks']['controls'].length

    let prev = this.myForm.controls['tracks']['controls'][len - 2]

    if(prev){
      this.myForm.controls['tracks']['controls'][len - 1]['controls']['startDate'].patchValue(prev.controls.endDate.value)
      this.myForm.controls['tracks']['controls'][len - 1]['controls']['startSecond'].patchValue(prev.controls.endSecond.value)

      this.myForm.controls['tracks']['controls'][len - 1]['controls']['endDate'].patchValue(prev.controls.endDate.value)
      this.myForm.controls['tracks']['controls'][len - 1]['controls']['endSecond'].patchValue(prev.controls.endSecond.value)
    } else {
      let day = this.date.getDate();
      let month = this.date.getMonth();
      let year = this.date.getFullYear();

      this.myForm.controls['tracks']['controls'][0]['controls']['startDate'].patchValue(year.toString() + '-' + (month + 1).toString() + '-' + day.toString() + ' ' + this.startHour.toString() + ':00' )
      this.myForm.controls['tracks']['controls'][0]['controls']['startSecond'].patchValue(0)

      this.myForm.controls['tracks']['controls'][0]['controls']['endDate'].patchValue(year.toString() + '-' + (month + 1).toString() + '-' + day.toString() + ' ' + this.startHour.toString() + ':00')
      this.myForm.controls['tracks']['controls'][0]['controls']['endSecond'].patchValue(0)

    }

  }

  onCheckChange(event, i) {

  const formArray: FormArray = this.myForm.controls['tracks']['controls'][i].get('contentTypes') as FormArray;

  /* Selected */
  if(event.target.checked){
    // Add a new control in the arrayForm
    formArray.push(new FormControl(event.target.value));
  }
  /* unselected */
    else{
      // find the unselected element
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }

        i++;
      });
    }
  }

  saveTrack(i){
    let tr = this.myForm.controls['tracks']['controls'][i]['controls']
    let start = new Date(tr['startDate'].value)
    let end = new Date(tr['endDate'].value)
    let start2 = new Date(start.setSeconds(tr['startSecond'].value))
    let end2 = new Date(end.setSeconds(tr['endSecond'].value))

    var track = {}

    if (tr['composer'].value != null){
      track = {
        index: i,
        episode: this.episodeId,
        show: this.showId,
        startTime: start2,
        endTime: end2,
        artist: tr['artist'].value,
        title: tr['title'].value,
        classification: tr['classification'].value,
        canCon: tr['canCon'].value,
        lgbtq: tr['lgbtq'].value,
        indigenous: tr['indigenous'].value,
        new: tr['new'].value,
        composer: tr['composer'].value
      }


    } else if ((tr['composer'].value == null) && (tr['artist'].value == null) && (tr['title'].value == null)){
      track = {
        index: i,
        episode: this.episodeId,
        show: this.showId,
        startTime: start2,
        endTime: end2,
        classification: tr['classification'].value,
        canCon: tr['canCon'].value,
        lgbtq: tr['lgbtq'].value,
        new: tr['new'].value,
        indigenous: tr['indigenous'].value,
      }
    } else {
      track = {
        index: i,
        episode: this.episodeId,
        show: this.showId,
        startTime: start2,
        endTime: end2,
        artist: tr['artist'].value,
        title: tr['title'].value,
        classification: tr['classification'].value,
        canCon: tr['canCon'].value,
        lgbtq: tr['lgbtq'].value,
        new: tr['new'].value,
        indigenous: tr['indigenous'].value
      }
    }

    if (tr['saved'].value === false){
      this.episodeService.saveTrack(track).subscribe(data => {
        if(data.success){
          this.episodeService.getCanconPercent(this.episodeId).subscribe(data => {
            if(data[0]){
              this.canconPercent = Math.floor(data[0].CanconPercent * 100).toString();
            }
          }, err =>{
            console.log(err);
            return false;
          });
          this.episodeService.getNewPercent(this.episodeId).subscribe(data => {
            if (data[0]){
              this.newPercent = Math.floor(data[0].newPercent * 100).toString();
            }
          }, err =>{
            console.log(err);
            return false;
          });
          tr['saved'].patchValue(true);
          this.flashMessage.show('Track Saved Successfully', {cssClass:'alert-success', timeout: 5000})
        } else {
          this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 5000})
        }
      },
      err => {
        console.log(err)
        return false
      })
    } else if (tr['saved'].value === true){
      this.episodeService.editTrack(track).subscribe(data => {
        if(data.success){
          tr['saved'].patchValue(true);
          this.episodeService.getCanconPercent(this.episodeId).subscribe(data => {
            if(data[0]){
              this.canconPercent = Math.floor(data[0].CanconPercent * 100).toString();
            }
          }, err =>{
            console.log(err);
            return false;
          });
          this.episodeService.getNewPercent(this.episodeId).subscribe(data => {
            if (data[0]){
              this.newPercent = Math.floor(data[0].newPercent * 100).toString();
            }
          }, err =>{
            console.log(err);
            return false;
          });
          this.flashMessage.show('Track Saved Successfully', {cssClass:'alert-success', timeout: 5000})
        } else {
          this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 5000})
        }
      },
      err => {
        console.log(err)
        return false
      })
    }


  }


}
