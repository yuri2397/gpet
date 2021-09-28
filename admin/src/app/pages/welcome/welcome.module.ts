import { NgModule } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { IconsProviderModule } from 'src/app/icons-provider.module';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { NzCardModule } from 'ng-zorro-antd/card';
@NgModule({
  imports: [
    WelcomeRoutingModule,
    NzLayoutModule,
    NzMenuModule,
    IconsProviderModule,
    NzCardModule
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent],
})
export class WelcomeModule {}
