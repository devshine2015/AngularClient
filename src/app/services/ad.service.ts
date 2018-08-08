import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers} from '@angular/http';


@Injectable()
export class AdService {

  slots:Array<string> = ['Side', 'Bottom'];

  constructor(
    private authService: AuthService,
    private http:Http
  ) { }

  getAllAds(){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/ads/get-all');
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

  deleteImage(path){
    let p = {
      path: path
    }
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/ads/delete-image');
    return this.http.post(ep, p, {headers: headers})
      .map(res => res.json());
  }

  saveAd(ad){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/ads/create');
    return this.http.post(ep, ad, {headers: headers})
      .map(res => res.json());
  }

  getAd(id){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/ads/get-ad/' + id);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json());
  }

  editAd(id, ad){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/ads/edit/' + id);
    return this.http.put(ep, ad, {headers: headers})
      .map(res => res.json());
  }

  getAdBySlot(slot){
    let p = {
      slot: slot
    }
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/ads/get');
    return this.http.post(ep, p, {headers: headers})
      .map(res => res.json());
  }

  increment(id){

    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/ads/increment/' + id);
    return this.http.put(ep, {headers: headers})
      .map(res => res.json());
  }

}
