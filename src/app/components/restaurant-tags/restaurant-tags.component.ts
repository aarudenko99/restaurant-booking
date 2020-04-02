import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import {ENTER, COMMA} from '@angular/cdk/keycodes';
import { WizardService } from '../../services/wizard.service';

@Component({
  selector: 'mm-restaurant-tags',
  templateUrl: './restaurant-tags.component.html',
  styleUrls: ['./restaurant-tags.component.scss']
})
export class RestaurantTagsComponent implements OnInit {
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  tags: Array<any> = [];

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];

  constructor(private wizardService: WizardService) { }

  ngOnInit() {
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tag
    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.wizardService.formData.Tags = this.tags;
  }


  remove(tag: any): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
    this.wizardService.formData.Tags = this.tags;
  }
}
