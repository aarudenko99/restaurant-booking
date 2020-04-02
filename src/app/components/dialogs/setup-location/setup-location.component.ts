import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { WizardService } from '../../../services/wizard.service';

@Component({
  selector: 'mm-setup-location',
  templateUrl: './setup-location.component.html',
  styleUrls: ['./setup-location.component.scss']
})
export class SetupLocationComponent implements OnInit {
  selectedLocation = { lat: null, lng: null };

  constructor(
    private wizardService: WizardService,
    public dialogRef: MatDialogRef<SetupLocationComponent>,
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
  }

  location(location) {
    this.selectedLocation.lat = location.lat();
    this.selectedLocation.lng = location.lng();
    console.log('location', this.selectedLocation, location.lat(), location.lng());
  }

  setLocation() {
    this.wizardService.formData.Lat = this.selectedLocation.lat;
    this.wizardService.formData.Long = this.selectedLocation.lng;
    this.dialogRef.close();
    console.log(this.wizardService);
  }
}
