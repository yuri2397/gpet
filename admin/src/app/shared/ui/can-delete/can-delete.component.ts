import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultComponent } from '../result/result.component';

@Component({
  selector: 'app-can-delete',
  standalone: true,
  imports: [CommonModule, ResultComponent],
  templateUrl: './can-delete.component.html',
  styleUrls: ['./can-delete.component.scss'],
})
export class CanDeleteComponent {
  @Input() message!: string;
  @Input() subtitle!: string;
  @Input() title!: string;
  @Input() erreurs!: string[];
  @Input() visible!: boolean;
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  onClose() {
    this.close.emit(true);
  }
}
