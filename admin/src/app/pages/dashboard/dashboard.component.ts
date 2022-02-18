import { DepartementService } from 'src/app/services/departement.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboard!: any;
  isLoad = true;

  constructor(private departementService: DepartementService) {}

  ngOnInit(): void {
    this.getDashboard();
  }

  getDashboard(){
    this.isLoad = true;
    this.departementService.dashboard().subscribe({
      next: response => {
        this.dashboard = response;
        this.isLoad = false;
      },
      error: errors => {
        console.log(errors);
      }
    })
  }
}
