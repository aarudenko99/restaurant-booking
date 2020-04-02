import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { google } from 'google-maps';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { LatLng } from 'ngx-google-places-autocomplete/objects/latLng';
declare var google: google;

@Component({
  selector: 'mm-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {
    @ViewChild('gmap', {static: true}) gmapElement: any;
    @ViewChild('placesRef', { static: true }) placesRef: GooglePlaceDirective;
    @Input() setupLocation: boolean;
    @Input() position: any;
    @Output() selectedLocation = new EventEmitter<LatLng>();
    map: google.maps.Map;
    marker: google.maps.Marker;
    mapProp

    options = {
        componentRestrictions: { country: 'NL' }
    };

    iconConfig = {
        url: './assets/media/marker/marker.svg',
        scaledSize: new google.maps.Size(50, 50),
        size: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(25, 50)
    };

    ngOnInit() {
        if (!this.position && this.setupLocation) {
            this.position = { lat: 52.379189, lng: 4.899431 };
        }
        console.log(this.position);
        const mapProp = {
            center: new google.maps.LatLng(this.position),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
        if (!this.setupLocation) {

        }

        this.marker = new google.maps.Marker({
            position: mapProp.center,
            icon: this.iconConfig,
            draggable: this.setupLocation ? this.setupLocation : false
        });
        this.marker.setMap(this.map);
    }

    selectPlace(place) {
        console.log(place, this.map, place.length, place.geometry);
        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();
        if (!place || !place.geometry) {
            return;
        }
        // Clear out the old markers.
        this.marker.setMap(null);
        this.marker =  new google.maps.Marker({
            map: this.map,
            position: place.geometry.location,
            title: place.name,
            draggable: true,
            icon: this.iconConfig
        });
        if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
        } else {
            bounds.extend(place.geometry.location);
        }
        this.map.panToBounds(bounds);
        this.selectedLocation.emit(place.geometry.location);
    }
}
