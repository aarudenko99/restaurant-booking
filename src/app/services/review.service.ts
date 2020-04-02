import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { AbstractService } from './abstract.service';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ReviewService extends AbstractService {
    apiURL = AppSettings.API_ENDPOINT;

    constructor(public http: HttpClient , public globalService: GlobalService) {
        super(http, globalService);
    }

    getReviewsByRestaurant(id: any, stars: any) {
        return this.http.get(this.apiURL + '/api/restaurant/' + id + '/review/stars/' + stars, { headers: this.getHeaders()}).pipe(
            map((response: any) => response)
        );
    }
}
