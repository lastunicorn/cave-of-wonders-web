import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { isDevMode } from '@angular/core';

// Disable certificate validation in development mode
if (isDevMode() && typeof process !== 'undefined') {
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
    console.warn('Development mode: SSL certificate validation disabled.');
}

bootstrapApplication(App, appConfig)
    .catch((err) => console.error(err));
