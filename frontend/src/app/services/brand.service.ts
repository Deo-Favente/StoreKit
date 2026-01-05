import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BrandService {
    private brands: string[] = ["Nike", "Adidas", "Vintage"]; // Replace with an API call

  getBrands(): Observable<string[]> {
    return of(this.brands);
  }

  getBrand(id: number): Observable<string | undefined> {
    const brand = this.brands[id];
    return of(brand);
  }
}
