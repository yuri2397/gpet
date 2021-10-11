import { DepartementService } from 'src/app/services/departement.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Departement } from 'src/app/models/departement';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss'],
})
export class DepartementComponent implements OnInit {
  departement: Departement = new Departement();
  dataLoad = false;
  isCollapsed = false;
  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private departementService: DepartementService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.departement.id = this.departementService.getUser().departement_id;
    this.find(this.departement);
  }

  find(departement: Departement) {
    this.dataLoad = true;
    this.departementService.find(departement).subscribe({
      next: (response) => {
        console.log('DEP', response);
        this.departement = response;
        this.dataLoad = false;
      },
      error: (errors) => {
        console.log(errors);
        this.dataLoad = false;
      },
    });
  }
}
