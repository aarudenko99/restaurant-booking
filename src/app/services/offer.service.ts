import { Injectable } from '@angular/core';
import { Offer } from '../common/models/offer';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { AbstractService } from './abstract.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class OfferService extends AbstractService {

    apiURL = AppSettings.API_ENDPOINT;
    constructor(public http: HttpClient, public globalService: GlobalService) {
        super(http, globalService);
    }


    getAlloffer() {
        return this.http.get(this.apiURL + '/api/offer', { headers: this.getHeaders() })
            .pipe(map((response: any) => response));
    }

    getAllofferByRestaurant(id: any) {
        return this.http.get(this.apiURL + '/api/restaurants/' + id + '/allOffers', { headers: this.getHeaders() })
            .pipe(map((response: any) => response));
    }

    update(menu: Offer) {
        return this.http.put(this.apiURL + '/api/offer', menu, { headers: this.getHeaders() })
            .pipe(map((response: any) => response));
    }

    // TO DO DEELETE
    // add(menu: Offer) {
    //     return this.http.post(this.apiURL + '/api/offer', menu, { headers: this.getHeaders() })
    //         .pipe(map((response: any) => response));
    // }

    addOffer(offer: Offer) {
        return this.http.put(this.apiURL + '/api/addOffer', offer, { headers: this.getHeaders() })
            .pipe(map((response: any) => response));
    }

    delete(id: any) {
        return this.http.delete(this.apiURL + '/api/offer/' + id, { headers: this.getHeaders() })
            .pipe(map((response: any) => response));
    }

    postFile(fileToUpload: FormData, id: any) {
        return this.http.post(this.apiURL + '/api/upload/Offer/' + id + '/image', fileToUpload)
            .pipe(map((response: any) => response));
    }

    getImages(id: any) {
        return this.http.get(this.apiURL + '/api/images/' + id + '/Offer', { headers: this.getHeaders() })
            .pipe(map((response: any) => response));
    }

    deleteImage(id: any) {
        return this.http.delete(this.apiURL + '/api/image/' + id, { headers: this.getHeaders() })
            .pipe(map((response: any) => response));
    }
}
