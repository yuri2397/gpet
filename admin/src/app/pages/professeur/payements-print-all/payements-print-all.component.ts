import { UserService } from 'src/app/services/user.service';
import { Departement } from 'src/app/models/departement';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Professor } from 'src/app/models/professor';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-payements-print-all',
  templateUrl: './payements-print-all.component.html',
  styleUrls: ['./payements-print-all.component.scss']
})
export class PayementsPrintAllComponent implements OnInit {
  @Input() professor!: Professor;
  departement!: Departement;
  constructor(private ref: NzModalRef, private userService: UserService) { }
  date = new Date();
  ngOnInit(): void {
    this.departement = this.userService.departement();
  }

  destroyModal(){
    this.ref.destroy(null);
  }

  print(){
  
  }
}
