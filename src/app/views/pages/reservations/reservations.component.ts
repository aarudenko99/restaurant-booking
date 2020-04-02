import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationPageComponent implements OnInit {
  view: string;

  constructor() { }

  ngOnInit() {
    this.view = 'list';
  }

  setType(type: string) {
    this.view = type;
  }

}
