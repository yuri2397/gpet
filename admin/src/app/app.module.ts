import { AnyPermissionComponent } from './shared/ui/any-permission/any-permission.component';
import { HasRoleInterceptor } from './shared/has-role.interceptor';
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
import { EdtShowComponent } from './pages/edt/edt-show/edt-show.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ErrorConnectionComponent } from './shared/ui/error-connection/error-connection.component';
import { SharedModule } from './shared/shared.module';
import { HttpLocalInterceptor } from './shared/http-local.interceptor';

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
    ErrorConnectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    /**
     * SHARED MODULE
     */
    SharedModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: fr_FR },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HasRoleInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpLocalInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
