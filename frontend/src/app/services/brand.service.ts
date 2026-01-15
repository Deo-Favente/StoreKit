import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Brand } from '@models/brand.model';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private apiUrl = `${environment.apiUrl}/brands`;

  constructor(private http: HttpClient) {}

  getAllBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl);
  }

  getBrand(id: number): Observable<Brand> {
    return this.http.get<Brand>(`${this.apiUrl}/${id}`);
  }

  createBrand(name: string): Observable<Brand> {
    return this.http.post<Brand>(this.apiUrl, {name: name});
  }

  updateBrand(id: number, name: string): Observable<Brand> {
    return this.http.put<Brand>(`${this.apiUrl}/${id}`, {name: name});
  }

  deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}