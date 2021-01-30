import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/orders';
import { UnavailableOrderDates} from'../models/unavailableOrderDates'


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  public unavailableOrderDates: object;

  private DOMAIN = "http://localhost:3000";

  constructor(private http: HttpClient) { 
   
  }

  public checkOut(order: Order): Observable<void> {
    return this.http.post<void>(`${this.DOMAIN}/orders`, order);
  }

  
  public countOrders() {
    return this.http.get(
      `${this.DOMAIN}/orders/numberOfOrders`
    );
    }
    
  public getOrder(): Observable<Order[]> {

    //  The http request will be sent after the subscribe() method will be called
    return this.http.get<Order[]>(`${this.DOMAIN}/orders/myOrder`);
}

public getUnavailableOrderDates(): Observable<UnavailableOrderDates> {
  return this.http.get("http://localhost:3000/orders/unavailable_dates");
}

}
