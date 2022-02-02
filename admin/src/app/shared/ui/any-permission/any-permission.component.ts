import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-any-permission',
  templateUrl: './any-permission.component.html',
  styleUrls: ['./any-permission.component.scss']
})
export class AnyPermissionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  home(){
    this.router.navigate(['/']);
  }
}
