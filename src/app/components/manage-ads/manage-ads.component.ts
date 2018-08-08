import { Component, OnInit } from '@angular/core';
import { AdService } from '../../services/ad.service';
import { AuthService } from '../../services/auth.service';
import {Http, Headers} from '@angular/http';


@Component({
  selector: 'app-manage-ads',
  templateUrl: './manage-ads.component.html',
  styleUrls: ['./manage-ads.component.css']
})
export class ManageAdsComponent implements OnInit {

  ads:any;

  constructor(
    private as: AdService,
    private authService: AuthService,
    private http: Http
  ) { }

  ngOnInit() {
    this.as.getAllAds().subscribe(data => {
      this.ads = data;
    }, err => {
      console.log(err);
      return false;
    })
  }

  //makes request to api to delete an article
  deleteAd(id): Promise<void> {
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/ads/delete-ad/' + id);
    return this.http.delete(ep, {headers:headers})
      .toPromise()
      .then(() => this.filterAds(id));
  }

  //removes the desired ad from the list of ads
  filterAds(id){
    this.ads = this.ads.filter(h => h._id != id)

  }

  active(e, article){
    if(e.target.checked){
      let active = {
        active: true
      }

      let headers = this.authService.setHeaders();
      let ep = this.authService.prepEndpoint('http://localhost:3000/ads/active/' + article._id);
      return this.http.put(ep, active, {headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          if (data.success){
            console.log("Ad is now active");
          } else {
            console.log("Failed to change status");
          }
        });
    } else if (!e.target.checked){
      let active = {
        active: false
      }

      let headers = this.authService.setHeaders();
      let ep = this.authService.prepEndpoint('http://localhost:3000/ads/active/' + article._id);
      return this.http.put(ep, active, {headers:headers})
        .map(res => res.json())
        .subscribe(data => {
          if (data.success){
            console.log("Ad is no longer active");
          } else {
            console.log("Failed to change status");
          }
        });
    }
  }


}
