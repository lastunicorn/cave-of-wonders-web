import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpParams, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PotResponse } from '../models/pot-response.model';
import { SSL_VERIFY } from '../interceptors/self-signed-certificate.interceptor';

@Injectable({
    providedIn: 'root'
})
export class PotService {
    private apiUrl = 'https://localhost:7272/pot';

    constructor(private http: HttpClient) {
    }

    getPots(currency?: string): Observable<PotResponse> {
        let params = new HttpParams();
        
        if (currency) {
            params = params.set('Currency', currency);
        }
        
        // Create context with SSL verification disabled for development mode
        const context = new HttpContext().set(SSL_VERIFY, isDevMode());
        
        return this.http.get<PotResponse>(this.apiUrl, { 
            params,
            context
        });
    }
}