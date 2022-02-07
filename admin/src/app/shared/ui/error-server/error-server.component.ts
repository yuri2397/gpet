import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-server',
  templateUrl: './error-server.component.html',
  styleUrls: ['./error-server.component.scss'],
})
export class ErrorServerComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  onClick() {}

  goHome(){
    this.router.navigate(['/']);
  }
}
