import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers} from '@angular/http';



@Injectable()
export class StaticPagesService {

  constructor(
    private authService:AuthService,
    private http:Http
  ) { }

  createArticle(article){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/static-pages/create');
    return this.http.post(ep, article,{headers: headers})
      .map(res => res.json())
  }

  editArticle(article, id){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/static-pages/edit/' + id);
    return this.http.put(ep, article, {headers: headers})
      .map(res => res.json())
  }

  getArticle(id){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/static-pages/get/' + id);
    return this.http.get(ep, {headers: headers})
      .map(res => res.json())
  }

  getPublished(){
    let headers = this.authService.setHeaders();
    let ep = this.authService.prepEndpoint('http://localhost:3000/static-pages/get-published');
    return this.http.get(ep, {headers: headers})
      .map(res => res.json())
  }



}
