import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { selfSignedCertificateInterceptor } from './interceptors/self-signed-certificate.interceptor';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZonelessChangeDetection(), // Restored zoneless change detection
        provideRouter(routes),
        provideClientHydration(withEventReplay()),
        provideHttpClient(
            withInterceptors([selfSignedCertificateInterceptor])
        )
    ]
};
