import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page, CreateProductRequest, Product } from '../../core/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'http://localhost:8080/api/inventory/products';

  constructor(private http: HttpClient) {}

  getProducts(page: number = 0, size: number = 10): Observable<Page<Product>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<Page<Product>>(this.apiUrl, {
      params,
      withCredentials: true
    });
  }

  createProduct(product: CreateProductRequest): Observable<number> {
    return this.http.post<number>(this.apiUrl, product, {
      withCredentials: true
    });
  }

  updateStock(id: number, quantityChange: number): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/${id}/stock`,
      { quantityChange },
      { withCredentials: true }
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(
        `${this.apiUrl}/${id}`,
        { withCredentials: true }
    );
  }

  updateProduct(id: number, product: CreateProductRequest): Observable<Product> {
    return this.http.put<Product>(
        `${this.apiUrl}/${id}`,
        product,
        { withCredentials: true }
    );
  }
}
