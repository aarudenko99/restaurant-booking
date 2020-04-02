import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'mm-calendar-popover',
  templateUrl: './calendar-popover.component.html',
  styleUrls: ['./calendar-popover.component.scss']
})
export class CalendarPopoverComponent implements OnInit {
  template: TemplateRef<any>;
  @ViewChild(NgbPopover, { static: true }) popover: NgbPopover;

  constructor() { }

  ngOnInit() {
  }

}
