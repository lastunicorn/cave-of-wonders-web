import { HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpContextToken } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { isDevelopmentMode } from '../utils/environment';

/**
 * HTTP context token for SSL verification
 */
export const SSL_VERIFY = new HttpContextToken<boolean>(() => true);

/**
 * This interceptor allows the application to connect to APIs with self-signed certificates in development mode.
 * It should never be used in production.
 */
export const selfSignedCertificateInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  // Only apply this in development mode
  if ((isDevMode() || isDevelopmentMode()) && req.url.includes('localhost')) {
    // Create a modified request with SSL verification disabled for localhost
    const modifiedReq = req.clone({
      context: req.context.set(SSL_VERIFY, false)
    });
    console.log('Development mode: SSL verification disabled for localhost request');
    return next(modifiedReq);
  }
  
  // Pass through all other requests unchanged
  return next(req);
};
