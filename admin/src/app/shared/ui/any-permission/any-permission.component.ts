import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-any-permission',
  standalone: true,
  imports: [CommonModule, ResultComponent],
  templateUrl: './any-permission.component.html',
  styleUrls: ['./any-permission.component.scss'],
})
export class AnyPermissionComponent {}
