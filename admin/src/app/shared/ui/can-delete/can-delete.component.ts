import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-can-delete',
  templateUrl: './can-delete.component.html',
  styleUrls: ['./can-delete.component.scss']
})
export class CanDeleteComponent implements OnInit {
  @Input() message!: string;
  @Input() subtitle!: string;
  @Input() title!: string;
  @Input() erreurs!: string[];
  @Input() visible!: boolean;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onClose(){
    this.close.emit(true);
  }

}
