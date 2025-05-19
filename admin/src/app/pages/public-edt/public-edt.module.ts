import { SharedModule } from './../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { PublicEdtComponent } from './public-edt.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

const routes: Routes = [
  {
    path: '',
    component: PublicEdtComponent,
  }
]

@NgModule({
  declarations: [
    PublicEdtComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzCarouselModule,
    SharedModule
  ]
})
export class PublicEdtModule { }
