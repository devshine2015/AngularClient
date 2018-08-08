import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {Http, Headers} from '@angular/http';

@Injectable()
export class NowPlayingService {

  constructor(
    private authService:AuthService,
    private http:Http
  ) { }

  getCurrentEpisode(){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/episodes/get-current-episode');
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

  getPlaceholder(){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/shows/get-placeholder');
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

  getCurrentTrack(){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/plays/get-current-track');
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

}
