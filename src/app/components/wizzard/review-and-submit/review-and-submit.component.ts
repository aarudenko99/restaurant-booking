import { Component, OnInit, Input } from '@angular/core';
import { WizardService } from '../../../services/wizard.service';
@Component({
  selector: 'mm-review-and-submit',
  templateUrl: './review-and-submit.component.html',
  styleUrls: ['./review-and-submit.component.scss']
})
export class ReviewAndSubmitComponent implements OnInit {
  @Input() timeslot;
  constructor(public wizardService: WizardService) { }

  ngOnInit() {
  }

}
