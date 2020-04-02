import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { User } from '../core/auth';
import { AbstractService } from './abstract.service';
import { GlobalService } from './global.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractService {
  apiURL = AppSettings.API_ENDPOINT;

  constructor(public http: HttpClient, public globalService: GlobalService) {
    super(http, globalService);
  }

  /*
  * Get latest created users of current Dashboard.
  *
  */
  getNewUsers(restaurantId: string, qty: string) {
    const queryParams = new HttpParams().set('last', qty);

    return this.http.get<User[]>(this.apiURL + '/api/staff/' + restaurantId, { headers: this.getHeaders(), params: queryParams })
      .pipe(map((response: any) => response));
  }
}
