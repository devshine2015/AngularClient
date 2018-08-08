import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class CookieService {

  constructor() { }

  private setCookieSource = new Subject <any>();

  setCookie$ = this.setCookieSource.asObservable();

  updatePlaylist(id){
    
    this.setCookieSource.next(id);
  }


}
