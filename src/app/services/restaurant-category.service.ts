import { Injectable } from '@angular/core';
import { RestaurantCategory } from '../common/models/restaurant-category';
import { AppSettings } from '../app.settings';
import { AbstractService } from './abstract.service';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class RestaurantCategoryService extends AbstractService {

    apiURL = AppSettings.API_ENDPOINT;
    constructor(public http: HttpClient, public globalService: GlobalService) {
        super(http, globalService);
    }

    getAllRestaurantCategory() {
        return this.http.get(this.apiURL + '/api/restaurantcategory', { headers: this.getHeaders() }).pipe(
            map((response: any) => response)
        );
    }

    update(menu: RestaurantCategory) {
        return this.http.put(this.apiURL + '/api/restaurantcategory', menu, { headers: this.getHeaders() }).pipe(
            map((response: any) => response)
        );
    }

    add(menu: RestaurantCategory) {
        return this.http.post(this.apiURL + '/api/restaurantcategory', menu, { headers: this.getHeaders() }).pipe(
            map((response: any) => response)
        );
    }

    delete(id: any) {
        return this.http.delete(this.apiURL + '/api/restaurantcategory/' + id, { headers: this.getHeaders() }).pipe(
            map((response: any) => response)
        );
    }

    getRestaurantsByCatId(catId: any, userId: any) {
        return this.http.get(this.apiURL + '/api/restaurant/categoryId/' + catId + '/user/' + userId, { headers: this.getHeaders() }).pipe(
            map((response: any) => response)
        );
    }
}
