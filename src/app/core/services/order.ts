import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateOrderDto } from '../models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/sales/orders';

  constructor(private http: HttpClient) {}

  placeOrder(order: CreateOrderDto): Observable<number> {
    return this.http.post<number>(this.apiUrl, order, {
      withCredentials: true
    });
  }
}
