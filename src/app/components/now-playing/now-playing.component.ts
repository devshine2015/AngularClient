import { Component, OnInit, OnDestroy, Renderer2} from '@angular/core';
import { Observable } from "rxjs";
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { AuthService } from "../../services/auth.service";
import { NowPlayingService } from '../../services/now-playing.service';
import { EpisodeService } from '../../services/episode.service';
import { CookieService } from '../../services/cookie.service';
import { ShowService } from '../../services/show.service';
import { DateToStringService } from '../../services/date-to-string.service';
import {Subscription} from 'rxjs/Subscription';
import { Router } from '@angular/router';

import * as $ from 'jquery';



declare var jquery:any;


@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.css']
})
export class NowPlayingComponent implements OnInit, OnDestroy {

  private audio:any;
  tracks:any
  subscription:Subscription;
  volume: number = 0.5;
  currentEpisode:any;
  currentTrack:any = null;
  currentShow:any;
  alive: boolean;
  display: boolean;
  timer: Observable<number>;
  interval: number;
  playing: boolean = false;
  src: string = 'http://rosetta.shoutca.st:8883/stream';
  currentTime: number = 0;
  radio: boolean = true;
  episodeDates:any;
  showNames:any;
  tags:any;
  isClicked:boolean = false;
  twitter:string;
  facebook:string;
  youtube:string;
  instagram:string;
  firstLive: boolean = false;
  secondLive: boolean = false;

  constructor(
    private npService: NowPlayingService,
    private renderer: Renderer2,
    private cookie: CookieService,
    private episode: EpisodeService,
    private show: ShowService,
    private ds: DateToStringService,
    private authService: AuthService,
    private router: Router
  ) {
    this.display = false;
    this.alive = true;
    this.interval = 2000;
    this.timer = Observable.timer(0, this.interval);
    this.audio = new Audio();
    this.twitter = 'https://twitter.com/CJLO1690AM';
    this.youtube = 'https://www.youtube.com/channel/UCvmUC0Wr8pKsEJK-3M-NXlg';
    this.facebook = 'https://www.facebook.com/cjlo1690am/';
    this.instagram = 'https://www.instagram.com/cjlo1690am/';
   }
  ngOnInit() {
    this.show.getUniqueTags().subscribe(data => {
      this.tags = data;
    }, err => {
      console.log(err);
      return false;
    })
    if(document.cookie){
      this.getPlaylist();

    }
    this.subscription = this.cookie.setCookie$.subscribe(data => {

      var obj = {};
      var tr = [];
      var ep = [];
      var ct = 0;

      if(document.cookie){
        var allcookies = document.cookie;

        // Get all the cookies pairs in an array
        let cookiearray = allcookies.split(';');
        let prs = JSON.parse(cookiearray[0].split('=')[1]);

        tr = prs.tracks;
        ep = prs.episodes;
        ct = prs.currentTime

        ep.push(data);

        this.episode.getEpisodeById(data).subscribe(episode => {

          tr.push(episode.filePath);

          obj = {
            tracks: tr,
            episodes: ep,
            currentTime: ct
          }

          this.makeCookieFromObject(obj);
          this.getPlaylist()

        }, err => {
          console.log(err);
          return false;
        });


      } else {
        ep.push(data);

        this.episode.getEpisodeById(data).subscribe(episode => {


          tr.push(episode.filePath);

          obj = {
            tracks: tr,
            episodes: ep,
            currentTime: ct
          }

          this.makeCookieFromObject(obj);

          this.getPlaylist()

        }, err => {
          console.log(err);
          return false;
        });
      }
    })


    console.log('!!!!!!!!!!!', this.secondLive);
    this.timer
      .takeWhile(() => this.alive)
      .subscribe(() => {
        this.npService.getCurrentEpisode()
          .subscribe((data) => {
              this.currentEpisode = data;
              if(data.show){
                this.currentShow = data.show;
              }
              if(data.plays){

                this.tracks = data.plays;
                this.currentTrack = this.getCurrentTrack(this.tracks);

              }

              if(!this.display){
                this.display = true;
              }

              if(data.success === false){
                this.npService.getPlaceholder().subscribe(data1 => {
                  this.currentShow = data1;
                  this.tracks = null;
                  this.npService.getCurrentTrack().subscribe(data2 => {
                    if(!data2.success){
                      this.currentTrack = null
                    } else {
                      this.currentTrack = data2;
                    }
                  }, err => {
                    console.log(err)
                    return false
                  })
                }, err => {
                  console.log(err)
                  return false
                })

              }


          }, err=> {
            console.log(err)
            return false
          });
      });
  }

  ngOnDestroy(){
    this.alive = false;
  }

  getCurrentTrack(tracks){
    var result = {}
    Object.keys(tracks).forEach(key => {

      if((new Date(tracks[key].startTime) < new Date(Date.now())) && (new Date(tracks[key].endTime) > new Date(Date.now()))){
        result = tracks[key]

      }
    })
    return result
  }

  makeCookieFromObject(obj){

    let date = new Date();
    date.setFullYear(date.getFullYear() + 100)

    let str = JSON.stringify(obj);

    document.cookie = "tracks=" + str + "; expires=" + date;

  }

  play(){
    this.audio.src = this.src;
    this.audio.volume = this.volume;
    if(!this.radio){

      if(document.cookie) {

        this.audio.src = encodeURI(this.readCookieArray());
        this.audio.currentTime = this.getTimeFromCookie();
        this.renderer.listen(this.audio, "timeupdate", () => { this.updateProgress()});
        this.renderer.listen(this.audio, "ended", () => { this.onEnd()});

      } else {
        alert("You havent't made a playlist yet!!");
        return;
      }

    }
    this.audio.play();
    this.playing = true;
  }

  pause(){
    this.currentTime = this.audio.currentTime;
    this.audio.pause();
    this.playing = false;
  }

  changeVolume(e){
    this.audio.volume = e;
  }

  live(){
    this.firstLive = !this.firstLive;
    this.radio = true;
    this.src = 'http://rosetta.shoutca.st:8883/stream';
    if($('.playlist-builder').is(':visible')) {
      $('.playlist-builder').slideToggle();
    }
  }


  toggleBuilder(){
    this.secondLive = !this.secondLive;
    this.radio = false;

    if(document.cookie){
      this.src = encodeURI(this.readCookieArray());
    }
    $('.playlist-builder').slideToggle();


  }

  updateProgress() {
   var progress = document.getElementById("progress");
   var value = 0;
   if (this.audio.currentTime > 0) {
      value = (100 / this.audio.duration) * this.audio.currentTime;
   }
   progress.style.width = value + "%";
   progress.style.height = "100%";

   var allcookies = document.cookie;


   // Get all the cookies pairs in an array
   let cookiearray = allcookies.split(';');

   let prs = JSON.parse(cookiearray[0].split('=')[1]);

   let tr = prs.tracks;
   let ep = prs.episodes;

   let obj = {
     tracks: tr,
     episodes: ep,
     currentTime: this.audio.currentTime
   }

   this.makeCookieFromObject(obj);
}

skip(e){
  let percent = Math.floor((100 / 295) * e.offsetX);
  this.currentTime = (this.audio.duration / 100) * percent;
  this.audio.currentTime = (this.audio.duration / 100) * percent;

}

track1(){
  console.log(this.showNames)
  console.log(document.cookie)
}

readCookieArray(){
  var allcookies = document.cookie;

console.log(allcookies);
  // Get all the cookies pairs in an array
  // let cookiearray = allcookies.split(';');
  //
  // let prs = JSON.parse(cookiearray[0].split('=')[1])
  //
  //
  // return prs.tracks[0];
  return '';

}

clearListCookies(){
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++)
  {
      var spcook =  cookies[i].split("=");
      this.deleteCookie(spcook[0]);
  }
}

deleteCookie(cookiename){
  var d = new Date();
  d.setDate(d.getDate() - 1);
  var expires = ";expires="+d;
  var name=cookiename;

  var value="";
  document.cookie = name + "=" + value + expires;
}

getPlaylist(){
  var allcookies = document.cookie;


  // Get all the cookies pairs in an array
  let cookiearray = allcookies.split(';');
  let prs = {
    episodes: []
  };
  try {
    prs = JSON.parse(cookiearray[0].split('=')[1]);
  } catch(err) {
    prs = {
      episodes: []
    };
  }

  if(prs.episodes.length === 0 ){
    this.showNames = [];
    this.episodeDates = [];
  }


  var dates = [];
  var names = [];

  const len = prs.episodes.length;
  var ctr = 0;
  var pr = prs.episodes;

let loop = (id: number) => {

    this.episode.getEpisodeById(id).subscribe(episode => {


      dates.push(episode.airDate);
      names.push(episode.show.name);
      ctr++;


      if (ctr === len){

        this.episodeDates = dates;
        this.showNames = names;
      }

      if(pr.length){
        loop(pr.shift())
      }

    }, err => {
      console.log(err);
      return false;
    });




}


loop(pr.shift());


}

//deletes entire playlist
deletePlaylist(): void {
  var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

removeTrack(n){
  var allcookies = document.cookie;


  // Get all the cookies pairs in an array
  let cookiearray = allcookies.split(';');

  let prs = JSON.parse(cookiearray[0].split('=')[1]);

  let tr = prs.tracks;
  let ep = prs.episodes;

  tr.splice(n, 1);
  ep.splice(n, 1);

  var obj = {};
  if(n === 0){

      obj = {
      tracks: tr,
      episodes: ep,
      currentTime: 0
    }

    this.currentTime = 0
    this.audio.pause();
    this.playing = false;
    this.audio.currentTime = 0
  } else {

      obj = {
      tracks: tr,
      episodes: ep,
      currentTime: prs.currentTime
    }

  }


  this.makeCookieFromObject(obj);

  this.getPlaylist();
}

onEnd(){
  var allcookies = document.cookie;


  // Get all the cookies pairs in an array
  let cookiearray = allcookies.split(';');

  let prs = JSON.parse(cookiearray[0].split('=')[1]);

  let tr = prs.tracks;
  let ep = prs.episodes;

  tr.splice(0, 1);
  ep.splice(0, 1);

  let obj = {
    tracks: tr,
    episodes: ep,
    currentTime: 0
  }

  this.makeCookieFromObject(obj);

  this.getPlaylist();

  this.src = encodeURI(this.readCookieArray());

  this.currentTime = 0;

  this.play();

}

getTimeFromCookie(){
  var allcookies = document.cookie;


  // Get all the cookies pairs in an array
  let cookiearray = allcookies.split(';');

  let prs = JSON.parse(cookiearray[0].split('=')[1]);

  return prs.currentTime;
}

highlight(event){

  if(event.target.className === "tag unclicked"){
    this.renderer.removeClass(event.target, 'unclicked')
    this.renderer.addClass(event.target, 'clicked')
  } else if (event.target.className === "child"){
    this.renderer.removeClass(event.target.parentElement, 'unclicked')
    this.renderer.addClass(event.target.parentElement, 'clicked')
  }

}

removeHighlight(event){
  if(event.target.className === "tag clicked"){
    this.renderer.removeClass(event.target, 'clicked')
    this.renderer.addClass(event.target, 'unclicked')
  } else if (event.target.className === "child"){
    this.renderer.removeClass(event.target.parentElement, 'clicked')
  }
}

addFromTag(tag){
  this.episode.getEpisodeFromTag(tag).subscribe(data => {

    var obj = {};
    var tr = [];
    var ep = [];
    var ct = 0;

    if(document.cookie){
      var allcookies = document.cookie;

      // Get all the cookies pairs in an array
      let cookiearray = allcookies.split(';');

      let prs = JSON.parse(cookiearray[0].split('=')[1]);

      tr = prs.tracks;
      ep = prs.episodes;
      ct = prs.currentTime

      ep.push(data._id);

      this.episode.getEpisodeById(data._id).subscribe(episode => {

        tr.push(episode.filePath);

        obj = {
          tracks: tr,
          episodes: ep,
          currentTime: ct
        }

        this.makeCookieFromObject(obj);
        this.getPlaylist()

      }, err => {
        console.log(err);
        return false;
      });


    } else {
      ep.push(data);

      this.episode.getEpisodeById(data).subscribe(episode => {


        tr.push(episode.filePath);

        obj = {
          tracks: tr,
          episodes: ep,
          currentTime: ct
        }

        this.makeCookieFromObject(obj);

        this.getPlaylist()

      }, err => {
        console.log(err);
        return false;
      });
    }
  })
}

goTo(location){
  window.location.href = location;
}

goHome(){
  this.router.navigate(['/']);
}
}
