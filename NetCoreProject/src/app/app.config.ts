import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors, withFetch, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { authInterceptor } from './interceptors/auth.interceptor';
import { loginGuard } from './guards/login.guard';

export const appConfig: ApplicationConfig = {
    providers: [
    provideRouter(routes), 
    provideClientHydration(), 
    provideHttpClient(withFetch()),
    provideAnimations(),
    importProvidersFrom(
      ToastrModule.forRoot({
        positionClass:"toast-bottom-right"
      }),
      BrowserAnimationsModule,
    ),
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};

