import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard-block',
  templateUrl: './dashboard-block.component.html',
  styleUrls: ['./dashboard-block.component.scss']
})
export class DashboardBlockComponent {

  @Input() firstCount: number;
  @Input() secondCount: number;
  @Input() name: string;

  constructor() { }

}
