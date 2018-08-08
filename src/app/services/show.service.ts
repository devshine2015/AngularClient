import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {Http, Headers} from '@angular/http';

@Injectable()
export class ShowService {

  constructor(
    private authService:AuthService,
    private http:Http
  ) { }


  //gets all past episodes for a show
  getPastEpisodes(id){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/shows/episodes/' + id);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }
  //get all shows listed as on air7
  getOnAir(){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/shows/get-on-air');
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

  //get all shows listed as archived
  getArchived(){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/shows/get-archive');
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

  // retrieves list of all shows from the api
  getShows(){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/shows/showlist');
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

  //changes the archive status of a show
  changeArchiveStatus(show, status){
    let body = {
      id: show._id,
      status: status
    }
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/shows/change-archive');
    return this.http.put(ep, body, {headers: headers})
      .map(res => res.json());
  }

  //changes the on air status of a show
  changeOnAirStatus(show, status){
    let body = {
      id: show._id,
      status: status
    }
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/shows/change-status');
    return this.http.put(ep, body, {headers: headers})
      .map(res => res.json());

  }

  deleteShow(id): Promise<void>{
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/shows/delete/' + id);
    return this.http.delete(ep, {headers: headers})
      .map(res => res.json())
      .toPromise();
  }

  getShowById(id){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/shows/get/' + id);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

  getShowsForDay(d){
    let day = {
      day: d
    }
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/shows/get-by-day');
    return this.http.post(ep, day, {headers: headers})
      .map(res => res.json());
  }

  getShowsByUser(user){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/shows/get-by-user/' + user._id);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

  getPlaceholder(){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/shows/get-placeholder');
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

  getForPlaylist(){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/shows/get-for-playlist');
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

  getUniqueTags(){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/shows/get-tags');
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

}
