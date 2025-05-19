import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-time-table',
  templateUrl: './detail-time-table.component.html',
  styleUrls: ['./detail-time-table.component.scss']
})
export class DetailTimeTableComponent {
  @Input('data') data: any;
}
