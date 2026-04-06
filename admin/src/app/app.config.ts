import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { fr_FR, NZ_I18N } from 'ng-zorro-antd/i18n';
import fr from '@angular/common/locales/fr';
import { routes } from './app.routes';
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { errorInterceptor } from './shared/interceptors/error.interceptor';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { MenuFoldOutline, MenuUnfoldOutline, FormOutline, DashboardOutline } from '@ant-design/icons-angular/icons';

registerLocaleData(fr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideAnimations(),
    provideNzIcons([MenuFoldOutline, MenuUnfoldOutline, DashboardOutline, FormOutline]),
    { provide: NZ_I18N, useValue: fr_FR },
    { provide: LOCALE_ID, useValue: 'fr' },
  ],
};
