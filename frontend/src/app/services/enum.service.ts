import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EnumService {
    private apiUrl = `${environment.apiUrl}/enums`;

    constructor(private http: HttpClient) { }

    getConditions(): Observable<string[]> {
        return this.http.get<string[]>(`${this.apiUrl}/conditions`);
    }

    getCategories(): Observable<string[]> {
        return this.http.get<string[]>(`${this.apiUrl}/categories`);
    }

    getSizes(): Observable<string[]> {
        return this.http.get<string[]>(`${this.apiUrl}/sizes`);
    }

    getStates(): Observable<string[]> {
        return this.http.get<string[]>(`${this.apiUrl}/states`);
    }
}