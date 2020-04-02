import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mm-icon-box-wave',
  templateUrl: './icon-box-wave.component.html',
  styleUrls: ['./icon-box-wave.component.scss']
})
export class IconBoxWaveComponent implements OnInit {
  @Input() title: string;
  @Input() text: string;
  @Input() icon: string;

  constructor() { }

  ngOnInit() {
  }

}
