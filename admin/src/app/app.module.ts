import { AnyPermissionComponent } from './shared/ui/any-permission/any-permission.component';
import { HasRoleInterceptor } from './shared/has-role.interceptor';
import { MatButtonModule } from '@angular/material/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NotFoundComponent } from './shared/ui/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzMessageComponent, NzMessageModule } from 'ng-zorro-antd/message';
import { EdtShowComponent } from './pages/edt/edt-show/edt-show.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { IconsProviderModule } from './icons-provider.module';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    EdtShowComponent,
    AnyPermissionComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzCardModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule,
    NzNotificationModule,
    NzMessageModule,
    NzResultModule,
    NzTableModule,
    MatIconModule,
    NzDividerModule,
    MatButtonModule,

  ],
  providers: [
    { provide: NZ_I18N, useValue: fr_FR },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HasRoleInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
